// command: npm run test

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);


const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {

  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas:'1000000' });

  lottery.setProvider(provider);
});

// Print the contract
// console.log(lottery);


// Ask yourself before writing the test cases:
// "What behaviour do you really care about with this contract"
describe('Lottery Contract', () => {
  it('Deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('Allows an account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length)
      });

  it('allows multiple players', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.03', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.03', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.025', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it('Does not allow a player to enter with less than or equal to 0.01 ether', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.3', 'ether')
      });
      // assert(false) => automatically fail the test
       assert(false);
  } catch (err) {
    assert(err);
  }

  });

  it('Only manager can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
   });

   it('Sends money to winner and reset the players array ', async () => {
      await lottery.methods.enter().send({
         from: accounts[0],
         value: web3.utils.toWei('2', 'ether')
      });
      // initialBalance after above send() is -2ETH and contract holds +2ETH

      const initialBalance = await web3.eth.getBalance(accounts[0]);
      await lottery.methods.pickWinner().send({ from: accounts[0] });
      // we received the money back after we caled pickWinner()
      // finalBalance should be  +2ETH - gas
      const finalBalance = await web3.eth.getBalance(accounts[0]);
      const difference = finalBalance - initialBalance;

      // The differenc should be > 1.9 ETH (~2ETH - gas)
      assert(difference > web3.utils.toWei('1.9', 'ether'));
    });

});
