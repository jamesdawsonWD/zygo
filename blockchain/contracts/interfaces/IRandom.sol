// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

/**
 * @title Exchange
 * @author Big Beluga
 *
 * Library for transferring tokens and interacting with ExchangeWrappers by using the Wei struct
 */
interface IRandom {
    function randomrange(uint256 a, uint256 b) external returns (uint256 randomnumber);

    function setSeed(uint256 _seed) external;
}
