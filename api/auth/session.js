import { parseCookies, verifyToken } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ authenticated: false, error: 'Method Not Allowed' });
  }

  const cookies = parseCookies(req);
  const token = cookies.afraa_session;

  const session = verifyToken(token);

  if (session && session.authenticated) {
    return res.status(200).json({
      authenticated: true,
      expiresAt: session.exp,
    });
  }

  return res.status(200).json({
    authenticated: false,
  });
}
