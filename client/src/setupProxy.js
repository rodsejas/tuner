const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://localhost:8888',  //ToDO set environment vars to handle dev vs. prod. currently set to heroku b/e
      target: 'https://canned-tunr.herokuapp.com/login',
      changeOrigin: true,
    })
  );
};