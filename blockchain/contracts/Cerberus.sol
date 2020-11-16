// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {Initializable} from '@openzeppelin/upgrades/contracts/Initializable.sol';

/**
    Cerberus - https://en.wikipedia.org/wiki/Cerberus

    The gate keeper of our contracts. Cerberus decides who can speak with who.
 */
contract Cerberus is Initializable {
    mapping(address => mapping(address => bool)) accessAddresses;
}
