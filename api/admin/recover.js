import {
  checkRateLimit,
  timingSafeCompare,
  signToken,
  parseCookies,
  generateDeviceId,
  signDeviceCookie,
  verifyDeviceCookie,
} from '../_auth.js';
import { adminResetLockdown } from '../_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  // Extract client IP for sliding rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || 'unknown';

  if (!checkRateLimit(`admin_recover_${ip}`)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many recovery attempts. Please wait a minute before trying again.',
    });
  }

  // Parse request body
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ ok: false, error: 'Invalid JSON request' });
    }
  }

  const submittedPassword = body?.password?.toString() || '';
  const expectedPassword = (process.env.SITE_PASSWORD || 'adyan@2010').trim();

  // Timing-safe password verification against the existing SITE_PASSWORD
  const isMatch = timingSafeCompare(submittedPassword.trim(), expectedPassword);

  if (!isMatch) {
    return res.status(401).json({
      ok: false,
      error: 'Access denied. Invalid administrator credentials.',
    });
  }

  // Identify or generate administrator's device ID
  const cookies = parseCookies(req);
  const verifiedDevice = verifyDeviceCookie(cookies.afraa_device);
  const adminDeviceId = verifiedDevice?.deviceId || generateDeviceId();

  // Atomically clear lockdown, increment generation (invalidating all old devices), and register admin as device #1
  const resetResult = await adminResetLockdown(adminDeviceId, 'Desktop PC (Adyan)');

  if (!resetResult.ok) {
    return res.status(500).json({
      ok: false,
      error: resetResult.error || 'Failed to restore access in database.',
    });
  }

  // Issue fresh signed HTTP-only device cookie with the new generation
  const deviceCookie = signDeviceCookie(adminDeviceId, resetResult.generation);
  const deviceCookieStr = [
    `afraa_device=${deviceCookie}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    `Max-Age=${365 * 24 * 60 * 60}`,
  ].join('; ');

  // Issue fresh signed HTTP-only session cookie (so admin is instantly authenticated)
  const sessionToken = signToken({
    authenticated: true,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  const sessionCookieStr = [
    `afraa_session=${sessionToken}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    `Max-Age=${7 * 24 * 60 * 60}`,
  ].join('; ');

  res.setHeader('Set-Cookie', [deviceCookieStr, sessionCookieStr]);

  return res.status(200).json({
    ok: true,
    title: 'PRIVACY LOCKDOWN REMOVED',
    message: 'Access has been restored successfully.',
    subMessage: 'Device registry has been reset.',
    slot: 1,
    generation: resetResult.generation,
  });
}
