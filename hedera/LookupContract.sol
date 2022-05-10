// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;

contract LookupContract {
    address public operator;

    // accountId => [contract1, contract2, ....]
    mapping(address => address[]) public store;

    constructor() {
        operator = msg.sender;
    }

    // not possible to get the return value with the HSCS? :(
    function getAllContracts(address _accountId)
        public
        view
        returns (address[] memory)
    {
        return store[_accountId];
    }

    function getContract(address _accountId, uint32 i)
        public
        view
        returns (address)
    {
        return store[_accountId][i];
    }

    function addContract(address _accountId, address _contractId)
        public
        onlyOperator
    {
        store[_accountId].push(payable(_contractId));
    }

    // remove item by index
    function deleteContract(address _accountId, uint32 i) public onlyOperator {
        delete store[_accountId][i];
    }

    // modifiers

    /// Only the operator can call this function
    error OnlyOperator();

    modifier onlyOperator() {
        if (msg.sender != operator) {
            revert OnlyOperator();
        }
        _;
    }
}
