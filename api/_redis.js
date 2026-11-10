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

local isMember = redis.call('SISMEMBER', KEYS[2], ARGV[1])
if isMember == 1 then
    local count = redis.call('SCARD', KEYS[2])
    return { 1, 'EXISTING', count, '' }
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
    redis.call('HSET', metaKey, 'registeredAt', ARGV[2], 'slot', tostring(newCount), 'label', label)
    redis.call('LPUSH', 'lockdown:history', cjson.encode({
        event = 'DEVICE_REGISTERED',
        deviceId = ARGV[1],
        slot = newCount,
        label = label,
        timestamp = ARGV[2]
    }))
    return { 1, 'REGISTERED', newCount, label }
else
    -- 3RD UNIQUE DEVICE DETECTED: ATOMICALLY TRIGGER GLOBAL PRIVACY LOCKDOWN!
    redis.call('SET', KEYS[1], 'locked')
    local breachData = cjson.encode({
        isLocked = true,
        lockedAt = ARGV[2],
        reason = 'Unauthorized third unique device attempted access',
        breachCount = count + 1
    })
    redis.call('SET', KEYS[3], breachData)
    redis.call('LPUSH', 'lockdown:history', cjson.encode({
        event = 'BREACH_LOCKDOWN',
        timestamp = ARGV[2],
        details = 'Third unique device attempted access. Global privacy lockdown activated.'
    }))
    return { 0, 'BREACH_TRIGGERED', count + 1, breachData }
end
`;

// Lua script to atomically clear lockdown and reset device registry
export const LUA_ADMIN_RECOVER = `
redis.call('DEL', KEYS[1])
redis.call('DEL', KEYS[2])
local recoveryData = cjson.encode({
    isLocked = false,
    recoveredAt = ARGV[1],
    recoveredBy = ARGV[2]
})
redis.call('SET', KEYS[3], recoveryData)
redis.call('LPUSH', 'lockdown:history', cjson.encode({
    event = 'ADMIN_RECOVERY',
    timestamp = ARGV[1],
    details = 'Global privacy lockdown cleared and device registry reset by Adyan.'
}))
return { 1, 'RECOVERED' }
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

export async function evaluateDeviceAccess(candidateDeviceId, label = '') {
  if (!redis) {
    // If Redis is temporarily unreachable, fallback safely to allow access
    return {
      allowed: true,
      action: 'FALLBACK',
      count: 1,
      isLocked: false,
    };
  }

  const keys = ['lockdown:status', 'devices:registered', 'lockdown:info'];
  const nowIso = new Date().toISOString();

  try {
    const result = await redis.eval(
      LUA_CHECK_DEVICE,
      keys,
      [candidateDeviceId, nowIso, label]
    );

    // result: [allowed (0 or 1), action, count, extra]
    const [allowedNum, action, count, extra] = result;
    const isAllowed = allowedNum === 1;

    let info = null;
    if (action === 'BREACH_TRIGGERED' || action === 'LOCKED') {
      if (typeof extra === 'string' && extra.length > 0) {
        try { info = JSON.parse(extra); } catch (e) {}
      } else if (typeof extra === 'object') {
        info = extra;
      }
    }

    return {
      allowed: isAllowed,
      action,
      count,
      isLocked: !isAllowed,
      info,
      label: action === 'REGISTERED' ? extra : undefined,
    };
  } catch (err) {
    console.error('Redis device evaluation error:', err);
    return {
      allowed: true,
      action: 'FALLBACK',
      count: 1,
      isLocked: false,
    };
  }
}

export async function adminResetLockdown(adminName = 'Adyan') {
  if (!redis) {
    return { ok: false, error: 'Redis connection unavailable.' };
  }

  const keys = ['lockdown:status', 'devices:registered', 'lockdown:info'];
  const nowIso = new Date().toISOString();

  try {
    await redis.eval(LUA_ADMIN_RECOVER, keys, [nowIso, adminName]);
    return { ok: true, message: 'Global privacy lockdown cleared and device registry reset.' };
  } catch (err) {
    console.error('Admin recovery execution error:', err);
    return { ok: false, error: err.message || 'Failed to clear lockdown.' };
  }
}
