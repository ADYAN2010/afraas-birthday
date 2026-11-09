import { checkRateLimit, timingSafeCompare, signToken } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  // Extract client IP
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || 'unknown';

  // Enforce rate limiting
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many attempts. Please wait a minute before trying again.',
    });
  }

  // Parse body
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ ok: false, error: 'Invalid JSON request' });
    }
  }

  const submittedPassword = body?.password?.toString() || '';
  const expectedPassword = (process.env.SITE_PASSWORD || 'afraa1511').trim();

  const isMatch = timingSafeCompare(submittedPassword.trim(), expectedPassword);

  if (!isMatch) {
    return res.status(401).json({
      ok: false,
      error: "That doesn't look right. Try again!",
    });
  }

  // Generate cryptographically signed 7-day session token
  const sessionToken = signToken({
    authenticated: true,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  // Set secure, signed HTTP-only session cookie
  const cookieOptions = [
    `afraa_session=${sessionToken}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Strict',
    `Max-Age=${7 * 24 * 60 * 60}`,
  ].join('; ');

  res.setHeader('Set-Cookie', cookieOptions);

  return res.status(200).json({
    ok: true,
    message: "Welcome to Afraa's Birthday surprise!",
  });
}
