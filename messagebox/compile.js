// require('./contracts/Messagebox.sol'); //bad!!!
// It would treat Messagebox.sol as javascript instead of solidity.
// Hence we need to read the content from the filesystem.


const path = require('path');
const fs = require('fs');
const solc = require('solc');

const MessageboxPath = path.resolve(__dirname, 'contracts', 'Messagebox.sol' )
// __dirname will always set it to pwd.

const source = fs.readFileSync(MessageboxPath, 'utf8');

//console.log(solc.compile(source, 1));
// 1 is the number of contracts we are compiling

module.exports = solc.compile(source, 1).contracts[':Messagebox'];
