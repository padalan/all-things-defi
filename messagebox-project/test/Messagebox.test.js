// command: npm run test

const assert = require('assert'); // used to make assertions about tests
const ganache = require('ganache-cli'); // Local ethereum test network
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider); // Provider serves as liason between web3 and ganache.


// Constructor function is capital'W' in Web3
// Instance of Web3 is web3 (in small letters)
// Web3 v0.x.x : "Primitive" interface - only callsback for async code
// Web3 V1.x.x : Support for promises + async/await
// Each instance of Web3, web3 connects to each different network.
// We usualy work with only one instance per application.

// Display fetched accounts.
web3.eth.getAccounts().then(fetchedAccounts => {
    console.log(fetchedAccounts);
  });

const { interface, bytecode } = require('../compile')
// ABI and bytecode

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

  // Rather than making promises, let's make use of async await synax
  accounts = await web3.eth.getAccounts();
  //Use of the accounts to deploy the contract
  messageBox = await new web3.eth.Contract(JSON.parse(interface))
  // Teaches web3 about what methods our Messagebox contract has
  // Note: Contract with capital C is a constructor functon.
  // Contract property lets us interact with existing or new contracs
  // 'interface' (ABI) is in JSON format. We parse JSON to a JS object.
  // 'messageBox' is now JS object we can use.

    .deploy({ data: bytecode, arguments: [INITIAL_STRING]})
    // Tells web3 that we want to deploy a new copy of this contract.

    .send({ from: accounts[0], gas:'1000000' });
    // Instructs web3 to send out a transaction that creates this contract.

  messageBox.setProvider(provider);

});

describe('Messagebox', () => {
  // Describe is used to group 'it' functions. Orginizational in nature.
  // 'it' is core of any test. Run a test and make an assertion.
  // Assert : Two values should be euqal. One the code produces and other expected value

  it('Deploys a contract', () => {
  // Print the list of accounts
  // console.log(accounts);

  // Print the contract
  // console.log(messageBox);

  // address of the deployed contract
  //  console.log(messageBox.options.address)

  // assert.ok => is the value OK?
    assert.ok(messageBox.options.address);
  });


  it('Has a default message', async () => {
      const message = await messageBox.methods.message().call();
      assert.equal(message, INITIAL_STRING);
  });


    it('Updates the message', async () => {
      await messageBox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0], gas:'1000000'});
      const message = await messageBox.methods.message().call();
      assert.equal(message, NEW_MESSAGE);

    });

});
