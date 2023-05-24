//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Deposit.sol";

contract DepositFactory {

  function deployDeposit(string memory metadata_,
    uint256 lifespan_,
    uint256 deposit_,
    uint256 date_) external payable returns (address) {
    Deposit newDeposit = (new Deposit){value:msg.value}(metadata_, lifespan_, deposit_, date_);
    return (address(newDeposit ));
  }
}