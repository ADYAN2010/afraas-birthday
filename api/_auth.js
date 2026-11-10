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

// Device registration cookie helpers
const DEVICE_SECRET =
  process.env.DEVICE_COOKIE_SECRET ||
  process.env.SESSION_SECRET ||
  'afraa-device-signing-secret-2026';

export function generateDeviceId() {
  return `dev_${crypto.randomBytes(16).toString('hex')}`;
}

export function signDeviceCookie(deviceId, generation = '1') {
  const timestamp = Date.now().toString();
  const genStr = generation.toString();
  const payload = `${genStr}:${deviceId}:${timestamp}`;
  const hmac = crypto
    .createHmac('sha256', DEVICE_SECRET)
    .update(payload)
    .digest('base64url');
  return `v2.${genStr}.${deviceId}.${timestamp}.${hmac}`;
}

export function verifyDeviceCookie(cookieVal) {
  if (!cookieVal || typeof cookieVal !== 'string') return null;
  const parts = cookieVal.split('.');

  // v2 cookie with explicit generation tracking
  if (parts.length === 5 && parts[0] === 'v2') {
    const [version, generation, deviceId, timestampStr, signature] = parts;
    const payload = `${generation}:${deviceId}:${timestampStr}`;
    const expectedHmac = crypto
      .createHmac('sha256', DEVICE_SECRET)
      .update(payload)
      .digest('base64url');

    try {
      const isSigValid = crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedHmac)
      );
      if (!isSigValid) return null;
      return {
        version: 'v2',
        generation,
        deviceId,
        timestamp: parseInt(timestampStr, 10),
      };
    } catch (e) {
      return null;
    }
  }

  // v1 cookie backward compatibility
  if (parts.length === 4 && parts[0] === 'v1') {
    const [version, deviceId, timestampStr, signature] = parts;
    const payload = `${deviceId}:${timestampStr}`;
    const expectedHmac = crypto
      .createHmac('sha256', DEVICE_SECRET)
      .update(payload)
      .digest('base64url');

    try {
      const isSigValid = crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedHmac)
      );
      if (!isSigValid) return null;
      return {
        version: 'v1',
        generation: '1',
        deviceId,
        timestamp: parseInt(timestampStr, 10),
      };
    } catch (e) {
      return null;
    }
  }

  return null;
}

export function isBotOrCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  const botKeywords = [
    'bot', 'crawl', 'spider', 'slurp', 'mediapartners', 'facebookexternalhit',
    'pingdom', 'uptime', 'monitor', 'curl', 'wget', 'python-requests',
    'lighthouse', 'vercel-cron', 'vercel-screenshot'
  ];
  return botKeywords.some((kw) => ua.includes(kw));
}
