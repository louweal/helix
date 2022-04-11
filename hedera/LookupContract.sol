// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract LookupContract {
    // the contract's owner, set in the constructor
    address owner;

    mapping(string => uint256) public store;
    mapping(string => uint256) public seller;
    mapping(string => uint256) public buyer;

    constructor(string memory _contractId, uint256 _store) {
        owner = msg.sender;

        store[_contractId] = _store;
    }

    function setStore(string memory _contractId, uint256 _storeId) public {
        store[_contractId] = _storeId;
    }

    function getStore(string memory _contractId) public view returns (uint256) {
        return store[_contractId];
    }

    // recover the funds of the contract
    function kill() public {
        if (msg.sender == owner) selfdestruct(payable(msg.sender));
    }
}
