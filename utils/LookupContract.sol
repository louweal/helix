// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;

contract LookupContract {
    address public operator;

    // accountId => [contract1, contract2, ....]
    mapping(address => address[]) public store;

    constructor() {
        operator = msg.sender;
    }

    function getContract(address _accountId, uint32 i) public view returns (address) {
        return store[_accountId][i];
    }

    function getNumContracts(address _accountId) public view returns (uint32) {
        return uint32(store[_accountId].length);
    }

    function addContract(address _accountId, address _contractId) public onlyOperator() {
        store[_accountId].push(payable(_contractId));
    }

    // remove item by index 
    function deleteContract(address _accountId, uint32 i) public  {
        delete store[_accountId][i];
    }

    // modifiers

    /// Only the operator can call this function
    error OnlyOperator();

    modifier onlyOperator() {
        if(msg.sender != operator) {
            revert OnlyOperator();
        }
        _;
    }
}
