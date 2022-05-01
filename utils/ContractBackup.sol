//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PurchaseAgreement {
    address payable public seller;
    address payable public buyer;
    address payable public charity;
    string public name;
    uint public deposit;
    uint public depositB;
    uint public depositB2;
    uint public depositC;
    uint public buyDate;
    uint public duration;

    enum State {Created, Sold, Resold, Inactive}
    State public state;

    constructor(string memory name_, uint duration_) payable {
        name = name_;
        seller = payable(msg.sender);
        deposit = msg.value; // lock X in the contract
        
        duration = duration_; //  in seconds 86400
        depositB = (msg.value * 60) / 100;
        depositB2 = (msg.value * 30) / 100;
        depositC = (msg.value * 10) / 100;

        // for testing
        buyDate = block.timestamp; // for testing only
        state = State.Sold;
        
    }

    /// The function cannot be called at the current state.
    error InvalidState();

    modifier inState(State state_) {
        if(state != state_) {
            revert InvalidState();
        }
        _;
    }

    /// Only the buyer can call this function
    error OnlyBuyer();

    modifier onlyBuyer() {
        if(msg.sender != buyer) {
            revert OnlyBuyer();
        }
        _;
    }

    /// This contract is still active!
    error ContractActive();

    modifier contractEnded() {
        if((block.timestamp - buyDate) < duration) {
            revert ContractActive();
        }
        _;
    }

    /// Only the seller can call this function
    error OnlySeller();

    modifier onlySeller() {
        if(msg.sender != seller) {
            revert OnlySeller();
        }
        _;
    }

    function setBuyer(address buyer_) external onlySeller() {
        buyer = payable(buyer_);
    }

    function setCharity(address charity_) external onlySeller() {
        charity = payable(charity_);
    }

    // buying a new item 
    function buyNew() external inState(State.Created) onlyBuyer() payable {
        require(msg.value == deposit, "Please send in the exact deposit amount");
        // buyer = payable(msg.sender);
        state = State.Sold;
        buyDate = block.timestamp;
        seller.transfer(deposit); // pay X to the seller
        seller = payable(msg.sender); // update seller to buyer
        buyer = payable(address(0)); // reset buyer value
    }

    function buySecondhand() external inState(State.Sold) onlyBuyer() payable {
        state = State.Resold;
        buyDate = block.timestamp;
        seller
    }
 
    function receive60() external inState(State.Sold) onlySeller() contractEnded() {
        state = State.Inactive; 
        seller.transfer(depositB);
    }

    function donate10() external inState(State.Sold) onlySeller() contractEnded() {
        state = State.Inactive; 
        seller.transfer(depositC);
    }

    // the buyer of a secondhand item receives 30% of the deposit
    function receive30() external inState(State.Sold) onlySeller() {
        state = State.Resold; 
        seller.transfer(depositB2);
    }

    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function abort() external onlySeller() inState(State.Created) {
        state = State.Inactive;
        seller.transfer(address(this).balance);
    }
}