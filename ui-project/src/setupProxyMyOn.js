const { createProxyMiddleware } = require('http-proxy-middleware');

// to proxy all api call to server in dev
// this will useful in dev mode
// but on production we can proxy servers
//http://localhost:8484 
module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://stolenreportbackend.herokuapp.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    })
  );
};
