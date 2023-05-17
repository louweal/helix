//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Helix {
    address payable public owner;
    string public metadata;
    uint256 public deposit;
    uint256 public initialDepositB;
    uint256 public depositB;
    uint256 public depositB2;
    uint256 public depositC;
    uint256 public date; //order date
    uint256 public lifespan;
    mapping(address => bool) public charities;

    enum State {
        Active,
        Inactive
    }
    State public state;

// create contract and store deposit
    constructor(
        string memory metadata_,
        uint256 lifespan_,
        uint256 deposit_,
        uint256 date_
    ) payable {
        require(
            deposit_ > 0,
            "The deposit should be more than x HBAR"
        );
        require(
            msg.value == deposit_,
            "Please send the correct deposit amount"
        );
        require(block.timestamp > date_, "Incorrect order date");

        owner = payable(msg.sender);
        metadata = metadata_;
        lifespan = lifespan_; //  in seconds 86400
        date = date_;
        deposit = deposit_;
        initialDepositB = (deposit_ * 60) / 100;
        depositB = initialDepositB;
        depositB2 = (deposit_ * 30) / 100;
        depositC = (deposit_ * 10) / 100;

        // official charities
        charities[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = true;

    }

    // functions
    function getAvailableDeposit() public view returns (uint256) {
        uint256 received = initialDepositB - depositB;
        if((block.timestamp - date ) >= lifespan) { // contract has ended
            return initialDepositB - received;
        }
        else {
            return (((initialDepositB * (block.timestamp - date)) / lifespan)
            ) - (initialDepositB - depositB);
        }
    }

    // collect remainder of 60%, set new owner and send him 30% directly
    function trnsfr(address newOwner_)
        external
        payable
        inState(State.Active)
        onlyOwner
    {
        require(
            depositB2 > 0 || depositC > 0 || depositB > 0,
            "Can't transfer contract because it no longer contains any deposits"
        );
        require(
            owner != newOwner_,
            "You can't transfer the contract to yourself"
        );

        //first collect your depositB
        collectAll();

        owner = payable(newOwner_);// set new owner
        uint256 amount = depositB2;
        depositB2 = 0;
        owner.transfer(amount); // new owner gets 30% directly
    }

    function collectAll() internal {
        require(
            depositB > 0,
            "You've already collected your complete deposit"
        ); 
        uint256 amount = depositB;
        depositB = 0;
        owner.transfer(amount); // new owner gets 30% directly
    }


    function collect() external payable inState(State.Active) onlyOwner {
        uint256 amount = getAvailableDeposit();
        depositB = depositB - amount;
        owner.transfer(amount);
    }

    // donate full remaining deposits B and C to charity
    function donate(address charity_)
        external
        payable
        inState(State.Active)
        onlyOwner
    {
                require(
            msg.sender != charity_,
            "You can't donate to yourself."
        );
        require(
            charities[charity_] == true,
            "Provided charity is not an official charity supported by Helix"
        ); 
        address payable charity = payable(charity_);
        uint256 amount = depositB + depositC;
        depositB = 0;
        depositC = 0;
        charity.transfer(amount); 
        state = State.Inactive;
    }

    /// The function cannot be called at the current state.
    error InvalidState();

    modifier inState(State state_) {
        if (state != state_) {
            revert InvalidState();
        }
        _;
    }

    /// Only the owner can call this function
    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }
}