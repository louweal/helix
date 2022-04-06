// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract LookupContract {
    // the contract's owner, set in the constructor
    address owner;

    mapping(string => uint256) public myDirectory;

    constructor(string memory _name, uint256 _mobileNumber) {
        owner = msg.sender;

        myDirectory[_name] = _mobileNumber;
    }

    function setMobileNumber(string memory _name, uint256 _mobileNumber)
        public
    {
        myDirectory[_name] = _mobileNumber;
    }

    function getMobileNumber(string memory _name)
        public
        view
        returns (uint256)
    {
        return myDirectory[_name];
    }

    // recover the funds of the contract
    function kill() public {
        if (msg.sender == owner) selfdestruct(payable(msg.sender));
    }
}
