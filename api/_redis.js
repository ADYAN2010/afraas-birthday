import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const redisUrl =
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL;

const redisToken =
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_TOKEN;

export const redis = redisUrl && redisToken
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

// Lua script to atomically evaluate device registration & trigger lockdown on 3rd unique device
export const LUA_CHECK_DEVICE = `
local status = redis.call('GET', KEYS[1])
if status == 'locked' then
    local info = redis.call('GET', KEYS[3])
    return { 0, 'LOCKED', 0, info or '' }
end

local currentGen = redis.call('GET', KEYS[4])
if not currentGen then
    currentGen = '1'
    redis.call('SET', KEYS[4], currentGen)
end

local clientGen = ARGV[4]
if clientGen == currentGen then
    local isMember = redis.call('SISMEMBER', KEYS[2], ARGV[1])
    if isMember == 1 then
        local count = redis.call('SCARD', KEYS[2])
        return { 1, 'EXISTING', count, currentGen }
    end
end

local count = redis.call('SCARD', KEYS[2])
if count < 2 then
    redis.call('SADD', KEYS[2], ARGV[1])
    local newCount = redis.call('SCARD', KEYS[2])
    local metaKey = 'device:' .. ARGV[1] .. ':meta'
    local label = ARGV[3]
    if label == '' then
        if newCount == 1 then
            label = "Desktop PC (Adyan)"
        else
            label = "iPad (Afraa)"
        end
    end
    redis.call('HSET', metaKey, 'registeredAt', ARGV[2], 'slot', tostring(newCount), 'label', label, 'generation', currentGen)
    redis.call('LPUSH', 'lockdown:history', cjson.encode({
        event = 'DEVICE_REGISTERED',
        deviceId = ARGV[1],
        slot = newCount,
        label = label,
        generation = currentGen,
        timestamp = ARGV[2]
    }))
    return { 1, 'REGISTERED', newCount, currentGen }
else
    -- 3RD UNIQUE DEVICE DETECTED: ATOMICALLY TRIGGER GLOBAL PRIVACY LOCKDOWN!
    redis.call('SET', KEYS[1], 'locked')
    local breachData = cjson.encode({
        isLocked = true,
        lockedAt = ARGV[2],
        reason = 'Third unique device attempted access',
        breachCount = count + 1,
        generation = currentGen
    })
    redis.call('SET', KEYS[3], breachData)
    redis.call('LPUSH', 'lockdown:history', cjson.encode({
        event = 'BREACH_LOCKDOWN',
        timestamp = ARGV[2],
        details = 'Third unique device attempted access. Global privacy lockdown activated.',
        generation = currentGen
    }))
    return { 0, 'BREACH_TRIGGERED', count + 1, breachData }
end
`;

// Lua script to atomically clear lockdown, increment generation, and register admin as device #1
export const LUA_ADMIN_RECOVER = `
redis.call('DEL', KEYS[1])
redis.call('DEL', KEYS[2])
local newGen = redis.call('INCR', KEYS[4])
local genStr = tostring(newGen)

redis.call('SADD', KEYS[2], ARGV[2])
local metaKey = 'device:' .. ARGV[2] .. ':meta'
redis.call('HSET', metaKey, 'registeredAt', ARGV[1], 'slot', '1', 'label', ARGV[3], 'generation', genStr)

local recoveryData = cjson.encode({
    isLocked = false,
    recoveredAt = ARGV[1],
    recoveredBy = 'Adyan',
    generation = newGen,
    adminDevice = ARGV[2]
})
redis.call('SET', KEYS[3], recoveryData)

redis.call('LPUSH', 'lockdown:history', cjson.encode({
    event = 'ADMIN_RECOVERY',
    timestamp = ARGV[1],
    details = 'Global privacy lockdown cleared. Device registry reset to generation ' .. genStr .. '. Admin registered as device 1.',
    generation = newGen,
    adminDevice = ARGV[2]
}))

return { 1, 'RECOVERED', 1, genStr }
`;

export async function getLockdownStatus() {
  if (!redis) {
    return { isLocked: false };
  }
  try {
    const status = await redis.get('lockdown:status');
    if (status === 'locked') {
      const info = await redis.get('lockdown:info');
      let parsed = {};
      if (typeof info === 'string') {
        try { parsed = JSON.parse(info); } catch (e) {}
      } else if (typeof info === 'object' && info !== null) {
        parsed = info;
      }
      return {
        isLocked: true,
        lockedAt: parsed.lockedAt || new Date().toISOString(),
        reason: parsed.reason || 'Unauthorized access activity detected.',
      };
    }
    return { isLocked: false };
  } catch (err) {
    console.error('Error fetching lockdown status from Redis:', err);
    return { isLocked: false };
  }
}

export async function evaluateDeviceAccess(candidateDeviceId, label = '', clientGeneration = '') {
  if (!redis) {
    return {
      allowed: true,
      action: 'FALLBACK',
      count: 1,
      isLocked: false,
      generation: '1',
    };
  }

  const keys = ['lockdown:status', 'devices:registered', 'lockdown:info', 'device:generation'];
  const nowIso = new Date().toISOString();

  try {
    const result = await redis.eval(
      LUA_CHECK_DEVICE,
      keys,
      [candidateDeviceId, nowIso, label, clientGeneration]
    );

    // result: [allowed (0 or 1), action, count, extra]
    const [allowedNum, action, count, extra] = result;
    const isAllowed = allowedNum === 1;

    let info = null;
    let generation = '1';

    if (action === 'BREACH_TRIGGERED' || action === 'LOCKED') {
      if (typeof extra === 'string' && extra.length > 0) {
        try { info = JSON.parse(extra); } catch (e) {}
      } else if (typeof extra === 'object') {
        info = extra;
      }
    } else {
      generation = (extra || '1').toString();
    }

    return {
      allowed: isAllowed,
      action,
      count,
      isLocked: !isAllowed,
      info,
      generation,
      label: action === 'REGISTERED' ? label : undefined,
    };
  } catch (err) {
    console.error('Redis device evaluation error:', err);
    return {
      allowed: true,
      action: 'FALLBACK',
      count: 1,
      isLocked: false,
      generation: '1',
    };
  }
}

export async function adminResetLockdown(adminDeviceId, adminLabel = 'Desktop PC (Adyan)') {
  if (!redis) {
    return { ok: false, error: 'Redis connection unavailable.' };
  }

  const keys = ['lockdown:status', 'devices:registered', 'lockdown:info', 'device:generation'];
  const nowIso = new Date().toISOString();

  try {
    const res = await redis.eval(LUA_ADMIN_RECOVER, keys, [nowIso, adminDeviceId, adminLabel]);
    const [statusNum, action, count, generation] = res;
    return {
      ok: true,
      message: 'Global privacy lockdown cleared and device registry reset.',
      count,
      generation: generation.toString(),
      deviceId: adminDeviceId,
    };
  } catch (err) {
    console.error('Admin recovery execution error:', err);
    return { ok: false, error: err.message || 'Failed to clear lockdown.' };
  }
}
