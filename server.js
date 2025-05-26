const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Proxy middleware that forwards all requests with a ?url= query param
app.use("/", (req, res, next) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missing url query parameter");
  }
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: false,
    followRedirects: true,
    pathRewrite: { "^/": "/" }
  })(req, res, next);
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
