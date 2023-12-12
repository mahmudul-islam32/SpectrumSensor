// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/SpectrumStatus", // Specify the endpoint you want to proxy
    createProxyMiddleware({
      target: "https://webfrontendassignment-isaraerospace.azurewebsites.net",
      changeOrigin: true,
    })
  );
};
