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

// Serve static files from /docs instead of /public
app.use(express.static('docs'));

// Serve static assets needed by the proxy libs
app.use('/uv/', express.static(uvPath));
app.use('/epoxy/', express.static(epoxyPath));
app.use('/baremux/', express.static(baremuxPath));

// Health check route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// 404 handler — serve your docs/404.html if no route matches
app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, 'docs', '404.html'));
});

// Create HTTP server and add COOP/COEP headers (required for the proxy libs)
const server = createServer((req, res) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  app(req, res);
});

// Handle WebSocket upgrade requests for Wisp
server.on('upgrade', (req, socket, head) => {
  if (req.url.endsWith('/wisp/')) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

// Start server
server.listen(PORT, () => {
  const address = server.address();
  console.log('Proxy server running on:');
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
});
