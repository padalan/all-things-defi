const assert = require('assert'); // used to make assertions about tests
const ganache = require('ganache-cli'); // Local ethereum test network

// Constructor function is capital Web3
// Instance of Web3 is web3(in small letters)
// Web3 v0.x.x : "Primitive" interface - only callsback for async code
// Web3 V1.x.x : Support for promises + async/await
// Each instance of Web3, web3 connects to each different network.
// We usualy work with only one instance per application.
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom'
    }
}

let car; //We could change the value of car. If we use const we couldn't.

beforeEach(()=> {
  console.log('Testing...');
  car = new Car();
});
// describe:  Grouping the it() functions together
// it():  run a test and make an assertions
// assert: code is run and expected variable value is exact.
describe('Car describe test:', () => {
  it('can park', () =>{
//    const car = new Car();  // defined in beforeEach
    assert.equal(car.park(), 'stopped');
  });

  it('can drive', () =>{
//    const car = new Car();  // definedin beforeEach
    assert.equal(car.drive(), 'vroom' );
  });
});
