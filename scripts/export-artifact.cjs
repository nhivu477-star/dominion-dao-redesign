const fs = require('node:fs');
const a = require('../artifacts/contracts/DominionDAO.sol/DominionDAO.json');
fs.mkdirSync('src/abis', {recursive:true});
fs.writeFileSync('src/abis/DominionDAO.json', JSON.stringify({abi:a.abi,bytecode:a.bytecode}));
