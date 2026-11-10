import { timingSafeCompare } from '../_auth.js';
import { redis, getLockdownStatus } from '../_redis.js';

export default async function handler(req, res) {
  // Extract secret from Authorization header or query param
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  const querySecret = (req.query?.secret || '').toString();

  const submittedSecret = bearerToken || querySecret;
  const expectedSecret = (
    process.env.LOCKDOWN_ADMIN_SECRET ||
    'adyan@admin2026'
  ).trim();

  if (!timingSafeCompare(submittedSecret.trim(), expectedSecret)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized admin request.' });
  }

  if (!redis) {
    return res.status(500).json({ ok: false, error: 'Redis connection unavailable.' });
  }

  try {
    const lockdown = await getLockdownStatus();
    const registeredDeviceIds = await redis.smembers('devices:registered');

    const devices = [];
    for (const devId of registeredDeviceIds) {
      const meta = await redis.hgetall(`device:${devId}:meta`);
      devices.push({
        deviceId: devId,
        slot: meta?.slot || '1',
        label: meta?.label || 'Authorized Device',
        registeredAt: meta?.registeredAt || 'Unknown',
      });
    }

    const rawHistory = await redis.lrange('lockdown:history', 0, 19);
    const history = (rawHistory || []).map((item) => {
      if (typeof item === 'string') {
        try { return JSON.parse(item); } catch (e) { return item; }
      }
      return item;
    });

    return res.status(200).json({
      ok: true,
      lockdown,
      deviceSlotsCount: registeredDeviceIds.length,
      maxSlots: 2,
      devices,
      history,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
