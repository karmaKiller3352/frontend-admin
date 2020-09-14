const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/", {
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {
        "/api/": "",
      },
    }),
    createProxyMiddleware("/api/image-upload/", {
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {
        "/api/image-upload/": "",
      },
    })
  );
};
