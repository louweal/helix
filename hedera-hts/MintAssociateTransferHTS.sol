// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

import "./hip-206/HederaTokenService.sol";
import "./hip-206/HederaResponseCodes.sol";

contract MintAssoTransHTS is HederaTokenService {
    address tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function mintFungibleToken(uint64 _amount) external {
        (
            int256 response,
            uint64 newTotalSupply,
            int64[] memory serialNumbers
        ) = HederaTokenService.mintToken(tokenAddress, _amount, new bytes[](0));

        //very very very ugly fix for unused vars warning....
        if (
            response != HederaResponseCodes.SUCCESS ||
            newTotalSupply < 0 ||
            serialNumbers.length < 0
        ) {
            revert("Mint Failed");
        }
    }

    function tokenAssociate(address _account) external {
        int256 response = HederaTokenService.associateToken(
            _account,
            tokenAddress
        );

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Associate Failed");
        }
    }

    function tokenTransfer(
        address _sender,
        address _receiver,
        int64 _amount
    ) external {
        int256 response = HederaTokenService.transferToken(
            tokenAddress,
            _sender,
            _receiver,
            _amount
        );

        if (response != HederaResponseCodes.SUCCESS) {
            revert("Transfer Failed");
        }
    }
}
