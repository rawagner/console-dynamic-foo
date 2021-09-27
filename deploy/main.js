const express = require("express");
const path = require("path");
const app = express();
const port = 9001;
const { createProxyMiddleware } = require("http-proxy-middleware");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

console.log("path", __dirname);

const clusterSvcUrl = "https://kubernetes.default.svc.cluster.local";
let clusterApiProxyOptions = {
  target: clusterSvcUrl,
  changeOrigin: true,
  pathRewrite: {
    "^/cluster-api/": "/",
  },
  logLevel: process.env.DEBUG ? "debug" : "info",
  secure: false,
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["Content-Security-Policy"] = "sandbox";
    proxyRes.headers["X-Content-Security-Policy"] = "sandbox";
  },
};
const clusterApiProxy = createProxyMiddleware(clusterApiProxyOptions);
app.use("/cluster-api/", clusterApiProxy);
app.use(express.static(path.join(__dirname, "../dist"))); //  "public" off of current is root

app.listen(port, () => {
  console.log(`Dynamic demo plugin app listening at http://localhost:${port}`);
});
