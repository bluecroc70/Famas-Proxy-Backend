// Load Express framework
const express = require('express');

// Import Ultraviolet middleware; access `.default` as per package docs
const ultravioletModule = require('@titaniumnetwork-dev/ultraviolet');

// Defensive check for .default export
const ultraviolet = ultravioletModule.default || ultravioletModule;

const app = express();
const PORT = process.env.PORT || 10000;

try {
  // Initialize Ultraviolet middleware with options if needed
  const uv = ultraviolet({
    // You can add options here if you want, e.g.,
    // allowCookies: true,
    // blacklist: ['example.com'],
  });

  // Use Ultraviolet as middleware at root path
  app.use('/', uv);

  // Basic route to confirm server is up (optional)
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  // Start server and listen on PORT
  app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
  });
} catch (error) {
  // Log and exit if there's a critical failure on startup
  console.error('Failed to start server:', error);
  process.exit(1);
}
