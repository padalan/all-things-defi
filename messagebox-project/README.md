# MessageBox Ethereum Smart Contract

A simple MessageBox smart contract project where we can set a message and display the message.
The smart contract is depoyed on Rinkeby testnet. Contract can be found on Etherscan at: https://rinkeby.etherscan.io/address/0x907f74Eb589bBD376dcF69195f47825f288aE0B7

## Getting Started

### Installing
Install NodeJS and associated packages:

```
sudo apt install nodejs npm
npm install --save solc mocha ganache-cli web3@1.0.0-beta.26 truffle-hdwallet-provider@0.0.3

```

Download the source. In the working directory run
```
npm init
```

## Compilation

To compile, run:
```
node compile.js
```

## Running the tests
We use mocha, a JavaScript framework to test.

Run below command to test
```
npm run test
```

## Deployment
Edit the seed mnemonics and run
```
node deploy.js
```

## Built with
* [Solidity](https://solidity.readthedocs.io/en/v0.4.0/) - The Contract oriented language
* [Mocha](https://github.com/mochajs/mocha) - JavaScript Framework
* [ganache-cli](https://truffleframework.com/ganache) - Local test Blockchain
* [truffle](https://truffleframework.com/) - Suite with tools to test an deploy Smart contracts
* [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API) - JavaScript app API
* [Infura](https://infura.io/) - An IPFS and Ethereum infrastructure cluster.
