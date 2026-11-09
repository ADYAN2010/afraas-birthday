import crypto from 'crypto';

// Server-side session signing secret
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.SITE_PASSWORD ||
  'afraa-birthday-2026-secret-hmac-key';

// In-memory sliding rate limiter (per instance)
const rateLimitMap = new Map();

export function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxAttempts = 6;

  const userAttempts = rateLimitMap.get(ip) || [];
  const validAttempts = userAttempts.filter((t) => now - t < windowMs);

  if (validAttempts.length >= maxAttempts) {
    return false; // Rate limited
  }

  validAttempts.push(now);
  rateLimitMap.set(ip, validAttempts);
  return true;
}

export function timingSafeCompare(submitted, target) {
  if (typeof submitted !== 'string' || typeof target !== 'string') {
    return false;
  }
  // Hash both to SHA-256 to ensure identical buffer length for timing-safe comparison
  const hashSubmitted = crypto.createHash('sha256').update(submitted).digest();
  const hashTarget = crypto.createHash('sha256').update(target).digest();
  return crypto.timingSafeEqual(hashSubmitted, hashTarget);
}

export function signToken(data) {
  const payloadStr = Buffer.from(JSON.stringify(data)).toString('base64url');
  const hmac = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadStr)
    .digest('base64url');
  return `${payloadStr}.${hmac}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadStr, signature] = parts;
  const expectedHmac = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadStr)
    .digest('base64url');

  try {
    const isSigValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedHmac)
    );
    if (!isSigValid) return null;

    const data = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (data.exp && data.exp < Date.now()) {
      return null; // Expired
    }
    return data;
  } catch (e) {
    return null;
  }
}

export function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach((cookie) => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    list[name] = decodeURIComponent(value);
  });

  return list;
}
