import {
  parseCookies,
  generateDeviceId,
  signDeviceCookie,
  verifyDeviceCookie,
  isBotOrCrawler,
} from '../_auth.js';
import { evaluateDeviceAccess, getLockdownStatus } from '../_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const userAgent = req.headers['user-agent'] || '';

  // 1. Check current lockdown state first
  const currentLockdown = await getLockdownStatus();
  if (currentLockdown.isLocked) {
    return res.status(200).json({
      lockdown: true,
      message: 'This private birthday experience has been temporarily locked to protect its contents.',
      info: currentLockdown,
    });
  }

  // 2. Ignore search-engine bots, uptime checks, and background monitors
  if (isBotOrCrawler(userAgent)) {
    return res.status(200).json({
      lockdown: false,
      crawler: true,
      message: 'Ignored crawler',
    });
  }

  // 3. Inspect client cookies for existing signed device registration
  const cookies = parseCookies(req);
  const rawDeviceCookie = cookies.afraa_device;
  const verifiedDevice = verifyDeviceCookie(rawDeviceCookie);

  let deviceId = verifiedDevice?.deviceId;
  let isNewDevice = false;

  if (!deviceId) {
    deviceId = generateDeviceId();
    isNewDevice = true;
  }

  // 4. Atomically evaluate device access against the 2-device limit
  const clientGen = verifiedDevice?.generation || '';
  const result = await evaluateDeviceAccess(deviceId, '', clientGen);

  if (result.isLocked) {
    // 3rd device breached or site got locked down
    return res.status(200).json({
      lockdown: true,
      action: result.action,
      message: 'This private birthday experience has been temporarily locked to protect its contents.',
      info: result.info,
    });
  }

  // 5. If newly registered or generation refreshed, set persistent signed HTTP-only device cookie
  if (isNewDevice || result.action === 'REGISTERED' || clientGen !== result.generation) {
    const signedCookie = signDeviceCookie(deviceId, result.generation);
    const cookieOptions = [
      `afraa_device=${signedCookie}`,
      'Path=/',
      'HttpOnly',
      'Secure',
      'SameSite=Strict',
      `Max-Age=${365 * 24 * 60 * 60}`, // 1 year
    ].join('; ');

    res.setHeader('Set-Cookie', cookieOptions);
  }

  return res.status(200).json({
    lockdown: false,
    deviceRegistered: true,
    slot: result.count,
    generation: result.generation,
    action: result.action,
  });
}
