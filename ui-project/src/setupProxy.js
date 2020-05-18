const { createProxyMiddleware } = require('http-proxy-middleware');

// to proxy all api call to server in dev
// this will useful in dev mode
// but on production we can proxy servers

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8484',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    })
  );
};
