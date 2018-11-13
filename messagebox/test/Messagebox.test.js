const assert = require('assert'); // used to make assertions about tests
const ganache = require('ganache-cli'); // Local ethereum test network
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
// Constructor function is capital Web3
// Instance of Web3 is web3(in small letters)
// Web3 v0.x.x : "Primitive" interface - only callsback for async code
// Web3 V1.x.x : Support for promises + async/await
// Each instance of Web3, web3 connects to each different network.
// We usualy work with only one instance per application.
const { interface, bytecode } = require('../compile')
//ABI and bytecode

let accounts;
let messageBox;
const INITIAL_STRING = "Hi Nikhil!"
const NEW_MESSAGE = 'Bye Nikhil!'
beforeEach(async () => {
  // Get the list of all accounts
  // we are using lowercase web3.
  // We use Web3 only once to create an instance
  // Every functon we call with web3 is asynchronous function.
  // This means every function delivers a promise.
//  web3.eth.getAccounts().then(fetchedAccounts => {
//      console.log(fetchedAccounts);
//    });

// Rather than making promises, let's make use of async await synax

  accounts = await web3.eth.getAccounts();
  //Use of the accounts to deploy the contract
  messageBox = await new web3.eth.Contract(JSON.parse(interface))
  //Teaches web3 about what methods our Messagebox contract has
  //Note: Contract with capital C is a constructor functon.
  // Contract property lets us interact with existing or new contracs
  // 'interface' (ABI) is in JSON format. We parse JSON to a JS object.

    .deploy({ data: bytecode, arguments: [INITIAL_STRING]})
    //Tells web3 that we want to deploy a new copy of this contract.

    .send({ from: accounts[0], gas:'1000000' });
    //Instructs web3 to send out a transaction that creates this contract.

  messageBox.setProvider(provider);

});

describe('Messagebox', () => {
  it('deploys a contract', () => {
  //  console.log(accounts);
  //  console.log(messageBox);
    assert.ok(messageBox.options.address);
  });

  it('has a default message', async () => {
      const message = await messageBox.methods.message().call();
      assert.equal(message, INITIAL_STRING);
  });


    it('updates the message', async () => {
      await messageBox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0], gas:'1000000'});
      const message = await messageBox.methods.message().call();
      assert.equal(message, NEW_MESSAGE)

    });

});
