//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PurchaseAgreement {
    address payable public seller;
    address payable public buyer;
    address public prevOwner;
    string public staticData;
    uint256 public deposit;
    uint256 public initialDepositB;
    uint256 public depositB;
    uint256 public depositB2;
    uint256 public depositC;
    uint256 public date;
    uint256 public duration;

    enum State {
        Created,
        Pending,
        Sold,
        Resold,
        Inactive
    }
    State public state;

    constructor(
        string memory staticData_,
        uint256 duration_,
        uint256 deposit_
    ) payable {
        seller = payable(msg.sender);
        prevOwner = msg.sender;
        staticData = staticData_;
        duration = duration_ * 86400; //  in seconds 86400
        date = block.timestamp;
        deposit = deposit_;
        initialDepositB = (deposit_ * 60) / 100;
        depositB = (deposit_ * 60) / 100;
        depositB2 = (deposit_ * 30) / 100;
        depositC = (deposit_ * 10) / 100;
    }

    // functions
    // setters

    function setBuyer(address buyer_) external onlySeller {
        state = State.Pending;
        buyer = payable(buyer_);
    }

    // getters
    function getState() public view returns (uint8) {
        return uint8(state);
    }

    function getDate() public view returns (uint256) {
        return date;
    }

    function getStatic() public view returns (string memory) {
        return staticData;
    }

    function getDuration() public view returns (uint256) {
        return duration;
    }

    // gets the initial deposit
    function getDeposit() public view returns (uint256) {
        return deposit;
    }

    function getPrevOwner() public view returns (address) {
        return prevOwner;
    }

    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function getMaxAmount() public view returns (uint256) {
        return
            (((initialDepositB * (block.timestamp - date)) / duration)) -
            (initialDepositB - depositB);
    }

    // confirm buying the new item
    function confirmPurchase(uint256 date_)
        external
        payable
        inState(State.Pending)
        onlyBuyer
    {
        require(
            msg.value == deposit,
            "Please send in the exact deposit amount"
        ); // add the deposit to the contract
        // update state
        state = State.Sold;

        if (date != 0) {
            // for providing fake dates for demo's
            date = date_;
        } else {
            date = block.timestamp;
        }
        prevOwner = seller;
        seller = payable(msg.sender); // update seller to buyer
        buyer = payable(address(0)); // reset buyer value
    }

    // collect 60% of the deposit back after contract end
    function collectDeposit()
        external
        payable
        inState(State.Sold)
        onlySeller
        contractEnded
    {
        state = State.Inactive;
        seller.transfer(depositB);
    }

    // delete contract: 100% is donated to the charity
    function deleteContract(address charity_)
        external
        payable
        inState(State.Sold)
        onlySeller
    {
        state = State.Inactive;
        address payable charity = payable(charity_);
        charity.transfer(deposit); // todo: charity
    }

    function deleteCreatedContract()
        external
        inState(State.Created)
        onlySeller
    {
        state = State.Inactive;
    }

    // the buyer of a secondhand item receives 30% of the deposit
    // + 10% is donated to the charity param
    function transferOwnership(address buyer_, address charity_)
        external
        payable
        inState(State.Sold)
        onlySeller
    {
        state = State.Resold;
        buyer = payable(buyer_);
        address payable charity = payable(charity_);
        date = block.timestamp;
        seller.transfer(depositB); // seller gets 60%
        buyer.transfer(depositB2); // buyer get 30%
        charity.transfer(depositC); // charity gets 10%
    }

    function collect() external payable inState(State.Sold) onlySeller {
        uint256 amount = (
            ((initialDepositB * (block.timestamp - date)) / duration)
        ) - (initialDepositB - depositB);
        // require(amount_ <= , "You can't collect this amount at this time");
        depositB = depositB - amount;
        seller.transfer(amount);
    }

    function donate(address charity_)
        external
        payable
        inState(State.Sold)
        onlySeller
    {
        uint256 amount = (
            ((initialDepositB * (block.timestamp - date)) / duration)
        ) - (initialDepositB - depositB);
        // require(amount_ <= , "You can't collect this amount at this time");
        depositB = depositB - amount;
        address payable charity = payable(charity_);
        charity.transfer(amount);
    }

    // modifiers

    /// The function cannot be called at the current state.
    error InvalidState();

    modifier inState(State state_) {
        if (state != state_) {
            revert InvalidState();
        }
        _;
    }

    /// Only the buyer can call this function
    error OnlyBuyer();

    modifier onlyBuyer() {
        if (msg.sender != buyer) {
            revert OnlyBuyer();
        }
        _;
    }

    /// This contract is still active!
    error ContractActive();

    modifier contractEnded() {
        if ((block.timestamp - date) < duration) {
            revert ContractActive();
        }
        _;
    }

    /// Only the seller can call this function
    error OnlySeller();

    modifier onlySeller() {
        if (msg.sender != seller) {
            revert OnlySeller();
        }
        _;
    }
}
