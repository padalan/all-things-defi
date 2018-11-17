const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  // edited the mnemonic
  // Hint: Is motorcycle rider an athelete or a warrior? Maybe a bug?
  'eye warrior stumble resource bulb athlete gather food end rug remind tide',
  'https://rinkeby.infura.io/v3/34e7998b9dce4f5491c31485ab6c8c4b'
);

const web3 = new Web3(provider);

// We don't need to write a function below but we do it
// as we cannot write await without a function.
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi Nikhil!'] })
    .send({gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address);
};
deploy();
