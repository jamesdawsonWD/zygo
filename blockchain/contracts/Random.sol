// SPDX-License-Identifier: MIT
import {Initializable} from '@openzeppelin/upgrades/contracts/Initializable.sol';

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

/**
 * @title Exchange
 * @author Big Beluga
 *
 * Library for transferring tokens and interacting with ExchangeWrappers by using the Wei struct
 */
contract Random is Initializable {
    address owner;
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function initialize() public initializer {
        owner = msg.sender;
    }

    function randomrange(uint256 OFFSET, uint256 SCALE) public returns (uint256 randomnumber) {
        uint256 MAX = uint256(0) - uint256(1);
        uint256 SCALIFIER = MAX / SCALE;
        uint256 seed = uint256(keccak256(abi.encodePacked(now)));
        uint256 scaled = seed / SCALIFIER;
        uint256 adjusted = scaled + OFFSET;
        return adjusted;
    }
}
