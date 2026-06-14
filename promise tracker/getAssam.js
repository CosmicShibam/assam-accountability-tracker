const https = require('https');
https.get('https://registry.npmjs.org/@svg-maps/india/-/india-2.0.0.tgz', (response) => {
  const fs = require('fs');
  const file = fs.createWriteStream("india.tgz");
  response.pipe(file);
});
