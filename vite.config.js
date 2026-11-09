import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-auth-dev-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api/auth/')) {
            return next();
          }

          // Polyfill status and json for Connect middleware
          res.status = function (code) {
            res.statusCode = code;
            return res;
          };
          res.json = function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };

          // Buffer body for POST requests
          if (req.method === 'POST') {
            const chunks = [];
            for await (const chunk of req) {
              chunks.push(chunk);
            }
            req.body = Buffer.concat(chunks).toString();
          }

          try {
            const cleanUrl = req.url.split('?')[0];
            if (cleanUrl === '/api/auth/login') {
              const { default: loginHandler } = await import('./api/auth/login.js');
              return await loginHandler(req, res);
            } else if (cleanUrl === '/api/auth/session') {
              const { default: sessionHandler } = await import('./api/auth/session.js');
              return await sessionHandler(req, res);
            } else if (cleanUrl === '/api/auth/logout') {
              const { default: logoutHandler } = await import('./api/auth/logout.js');
              return await logoutHandler(req, res);
            }
          } catch (err) {
            console.error('API dev error:', err);
            return res.status(500).json({ ok: false, error: err.message });
          }

          next();
        });
      },
    },
  ],
});
