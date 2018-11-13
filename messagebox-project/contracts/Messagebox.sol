pragma solidity ^0.4.17;
// Version of our code written in: 0.4.17

contract Messagebox {
// Define a new contract (called Inbox) with new methods and new variables below.

    string public message;
    string private note;
    // Declare all of the storage (or instance) variables (called message) and their types that will be used in the contract.
    // public - Ayone can call this function.
    // private - Only this contract can call this function.
    // note is not required. we are using it to test private.
    // Define functions that will be members of this contract below.


    // DEPRICATED:
    // function Messagebox(string initialMessage) public {
        // Constructor Function: Inbox function has the same name as the Contract.
        // Constructor function will automatically be called when the contract is called.
        // message = initialMessage;
      // }
    // Instead use below
    constructor(string initialMessage) public {
      message = initialMessage;
    }


    function setMessage(string newMessage) public {
        note = newMessage;
        message = note;
    }

    //function getMessage() public view returns (string) {
        //getMessage() - Name of the function
        //public view  - Function type declaration
        //Eg. of common function types: public, private, view, constant, pure, payable
        //returns (string) -

    //    return message;
    //}
}
