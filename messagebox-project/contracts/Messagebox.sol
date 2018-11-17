pragma solidity ^0.4.17;
// Version of our code written in: 0.4.17

contract Messagebox {
// Define a new contract (called Inbox) with new methods and new variables below.

    string public message;
    string private note;
    // Declare all of the storage (or instance) variables and their types that will be used in the contract.
    // public - Anyone can call this function.
    // private - Only this contract can call this function.
    // 'note' variable is not required. we are using it to only test private.

    // Define functions that will be the members of this contract.
    constructor(string initialMessage) public {
      message = initialMessage;
    }

    // Set a new message to the string to message
    function setMessage(string newMessage) public {
        note = newMessage; // Again, using 'note' only to test private.
        message = note;
    }
}
