const fs = require('fs');
const path = require('path');

fs.writeFileSync(path.join(__dirname, 'dist', 'esm','package.json'), '{"type":"module"}');