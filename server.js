// Load Express framework
const express = require('express');

// Import Ultraviolet middleware; access `.default` as per package docs
const ultravioletModule = require('@titaniumnetwork-dev/ultraviolet');

// Defensive check for .default export
const ultraviolet = ultravioletModule.default || ultravioletModule;

const app = express();
const PORT = process.env.PORT || 10000;

try {
  // Middleware: parse JSON bodies (optional, useful if you extend API)
  app.use(express.json());

  // Simple logging middleware for every request
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
  });

  // Initialize Ultraviolet middleware with options if needed
  const uv = ultraviolet({
    // Example options:
    // allowCookies: true,
    // blacklist: ['example.com'],
  });

  // Use Ultraviolet as middleware at root path
  app.use('/', uv);

  // Basic route to confirm server is up
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
