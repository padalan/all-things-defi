// compile.js specifies what file should be compiled using specified compiler.
// File: PWD/contracts/Lottery.sol
// compiler: solc

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const LotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol' )
const source = fs.readFileSync(LotteryPath, 'utf8');

// console.log(solc.compile(source, 1));
// 1 is the number of contracts we are compiling
module.exports = solc.compile(source, 1).contracts[':Lottery'];
// Check the console.log output for clarity.
