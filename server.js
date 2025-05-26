// server.js
const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { hostname } = require('os');

// Import paths from Ultraviolet and related packages
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const { epoxyPath } = require('@mercuryworkshop/epoxy-transport');
const { baremuxPath } = require('@mercuryworkshop/bare-mux/node');
const wisp = require('wisp-server-node');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the 'docs' folder
app.use(express.static('docs'));
app.use('/uv/', express.static(uvPath));
app.use('/epoxy/', express.static(epoxyPath));
app.use('/baremux/', express.static(baremuxPath));

// Health check route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Handle 404 errors - serve 404.html from docs folder
app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, 'docs', '404.html'));
});

// Create and configure HTTP server with COOP & COEP headers
const server = createServer((req, res) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  app(req, res);
});

// Handle WebSocket upgrades for Wisp
server.on('upgrade', (req, socket, head) => {
  if (req.url.endsWith('/wisp/')) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

// Start the server
server.listen(PORT, () => {
  const address = server.address();
  console.log('Proxy server running on:');
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
});
