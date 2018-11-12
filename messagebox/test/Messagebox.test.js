const assert = require('assert'); // used to make assertions about tests
const ganache = require('ganache-cli'); // Local ethereum test network

const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
// Constructor function is capital Web3
// Instance of Web3 is web3(in small letters)
// Web3 v0.x.x : "Primitive" interface - only callsback for async code
// Web3 V1.x.x : Support for promises + async/await
// Each instance of Web3, web3 connects to each different network.
// We usualy work with only one instance per application.

let accounts;

beforeEach(async () => {
  // Get the list of all accounts
  // we are using lowercase web3.
  // We use Web3 only nce to create an instance
  // Every functon we call with web3 is asynchronous function.
  // This means every function delivers a promise.
//  web3.eth.getAccounts().then(fetchedAccounts => {
//      console.log(fetchedAccounts);
//    });

// Rather than making promises, let's make use of async await synax

  accounts = await web3.eth.getAccounts();
  //Use of the accounts to deploy
  // the contracts

});

describe('Messagebox', () => {
  it('deploys a contract', () => {
    console.log(accounts);
  });
});
