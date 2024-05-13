const fs = require('fs');

const filePath = './srv/config.json';

fs.readFile(filePath, 'utf-8', (error, data) => {
  if (error) {
    console.error(`Error: Unable to read ${filePath}. Reason: ${error}`);
    return;
  }

  const config = JSON.parse(data);
  console.log(`Configuration loaded from ${filePath}:`);
  console.log(config);
});