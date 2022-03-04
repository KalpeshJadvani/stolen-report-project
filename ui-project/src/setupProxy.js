const { createProxyMiddleware } = require('http-proxy-middleware');

// to proxy all api call to server in dev
// this will useful in dev mode
// but on production we can proxy servers

// I will use for the future
// function getRootUrl() {
//   const port = process.env.PORT || 8000;
//   const dev = process.env.NODE_ENV !== 'production';
//   const ROOT_URL = dev ? `http://localhost:${port}` : 'https://builderbook.org';
 
//   return ROOT_URL;
//  }

//http://localhost:8484 
module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://stolenreportbackend.herokuapp.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    })
  );
};
