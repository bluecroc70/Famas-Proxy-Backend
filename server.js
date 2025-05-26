const { Ultraviolet } = require("@titaniumnetwork-dev/ultraviolet");

// You can customize the port Render assigns using environment variable PORT
const port = process.env.PORT || 3000;

const uv = new Ultraviolet({
  // optional: you can specify a config here if you want
  // e.g. userAgent, cache settings, etc.
  // leave empty for defaults
});

uv.listen(port).then(() => {
  console.log(`Ultraviolet proxy server running on port ${port}`);
});
