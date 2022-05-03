//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PurchaseAgreement {
    address payable public seller;
    address payable public buyer;
    address payable public charity;
    string public name;
    uint public deposit;
    uint public initialDepositB;
    uint public depositB;
    uint public depositB2;
    uint public depositC;
    uint public buyDate;
    uint public duration;

    enum State {Created, Sold, Resold, Inactive}
    State public state;

    constructor(string memory name_, uint duration_, uint deposit_, address charity_) payable {
        name = name_;
        seller = payable(msg.sender);
        deposit = deposit_; // just a variable not 'locked in' yet
        charity = payable(charity_);
        
        duration = duration_ * 86400; //  in seconds 86400
        initialDepositB = (deposit_ * 60) / 100;
        depositB = (deposit_ * 60) / 100;
        depositB2 = (deposit_ * 30) / 100;
        depositC = (deposit_ * 10) / 100;
    }

    // functions
    // setters

    function setBuyer(address buyer_) external onlySeller() {
        buyer = payable(buyer_);
    }

    function setCharity(address charity_) external onlySeller() {
        charity = payable(charity_);
    }

    // getters
    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function getMaxAmount() public view returns (uint256) {
        return (((initialDepositB * (block.timestamp - buyDate))/ duration)) - (initialDepositB - depositB);
    } 

    // confirm buying the new item 
    function confirmPurchase() external inState(State.Created) onlyBuyer() payable {
        require(msg.value == deposit, "Please send in the exact deposit amount"); // add the deposit to the contract
        // update state
        state = State.Sold;
        buyDate = block.timestamp;
        // buyer = msg.sender;
        // seller.transfer(deposit); // pay X to the seller
        seller = payable(msg.sender); // update seller to buyer
        buyer = payable(address(0)); // reset buyer value
    }

    // collect 60% of the deposit back after contract end
    function collectDeposit() external inState(State.Sold) onlySeller() contractEnded() payable {
        state = State.Inactive; 
        seller.transfer(depositB);
    }

    // delete contract: 100% is donated to the charity
    function deleteContract(address charity_) external inState(State.Sold) onlySeller() payable {
        state = State.Inactive; 
        charity = payable(charity_);
        charity.transfer(deposit); // todo: charity
    }

    // the buyer of a secondhand item receives 30% of the deposit
    // + 10% is donated to the charity param
    function transferOwnership(address buyer_, address charity_) external inState(State.Sold) onlySeller() payable {
        state = State.Resold; 
        buyer = payable(buyer_);
        charity = payable(charity_);
        buyDate = block.timestamp;
        seller.transfer(depositB); // seller gets 60%
        buyer.transfer(depositB2); // buyer get 30%
        charity.transfer(depositC); // charity gets 10%
    }

    function collect(uint amount) external inState(State.Sold) onlySeller payable {
        require(amount <= (((initialDepositB * (block.timestamp - buyDate))/ duration)) - (initialDepositB - depositB), "You can't collect this amount at this time");
        depositB = depositB - amount;
        seller.transfer(amount);
    }

    function abort() external onlySeller() inState(State.Created) {
        state = State.Inactive;
        seller.transfer(address(this).balance);
    }

    // modifiers

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

}