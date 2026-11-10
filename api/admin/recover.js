import { checkRateLimit, timingSafeCompare } from '../_auth.js';
import { adminResetLockdown } from '../_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  // Extract client IP for rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || 'unknown';

  if (!checkRateLimit(`admin_${ip}`)) {
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

  const submittedSecret = body?.secret?.toString() || '';
  const expectedSecret = (
    process.env.LOCKDOWN_ADMIN_SECRET ||
    'adyan@admin2026'
  ).trim();

  const isMatch = timingSafeCompare(submittedSecret.trim(), expectedSecret);

  if (!isMatch) {
    return res.status(401).json({
      ok: false,
      error: 'Invalid administrator recovery credential.',
    });
  }

  // Reset lockdown and clear device registry in Redis
  const resetResult = await adminResetLockdown('Adyan');

  if (!resetResult.ok) {
    return res.status(500).json({
      ok: false,
      error: resetResult.error || 'Failed to restore access in database.',
    });
  }

  return res.status(200).json({
    ok: true,
    message: 'Global privacy lockdown cleared. Device slots have been successfully reset.',
  });
}
