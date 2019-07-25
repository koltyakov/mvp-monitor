const path = require('path');

const [ root, conf ] = process.argv.slice(2);

const json = require(path.join(root, conf));

console.log(JSON.stringify(json).toString('utf8'));