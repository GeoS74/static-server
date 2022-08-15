const fs = require('fs');
const path = require('path');

const parser = require('./parser');

const reader = fs.createReadStream(path.join(__dirname, '../../wiki/main.md'));

const data = [];
reader.on('data', (chunk, _, callback) => {
  data.push(chunk);
});

reader.on('close', (_) => {
  const page = parser(Buffer.concat(data).toString());
  console.log(page);
});
