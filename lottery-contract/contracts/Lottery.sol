pragma solidity ^0.4.7;

contract Lottery {
    address public manager;
    address[] public players; // Dynamic address array
    address public winner;

    constructor() public {
        manager = msg.sender;
    }

    // Since we might recieve ether, use funtion type payable.
    function enter() public payable {
        // Require is used for validation.
        // Requirement has to be satisfied for the function to run.
        require(msg.value > 0.01 ether); // Min ether to participate in the lottery
        players.push(msg.sender); // Push the sender's address into the players array
    }

    // Pseudo Random generator.
    function random() public view returns(uint) {
         return uint(keccak256(block.difficulty, now, players));
    }

    // Pick the winner and send money.
    function pickWinner() public onlyManager {
        // Making sure only Manager can pick a winner.
        // Created a modifier 'onlyManager' to replace below line
        // require(msg.sender == manager);

        uint index = random() % players.length;
        winner = players[index];
        players[index].transfer(this.balance);

        // Create a new empty(0) dynamic array of type address.
        players = new address[](0);
    }

    // modifier keyword creates a function modifier
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
        // The underscore above => take all the code in a funcion and put it here.
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
