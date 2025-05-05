require('dotenv').config();
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'out')));

app.use('/api', createProxyMiddleware({
  target: process.env.PROXY_TARGET,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
