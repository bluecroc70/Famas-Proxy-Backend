const express = require('express');
// IMPORTANT: Ultraviolet is exported as default, so access `.default`
const ultraviolet = require('@titaniumnetwork-dev/ultraviolet').default;

const app = express();
const PORT = process.env.PORT || 10000;

const uv = ultraviolet({
  // put any Ultraviolet options here if needed
});

app.use('/', uv);

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
