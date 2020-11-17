// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {Initializable} from '@openzeppelin/upgrades/contracts/Initializable.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

/**
    Cerberus - https://en.wikipedia.org/wiki/Cerberus

    The gate keeper of our contracts. Cerberus decides who can speak with who.
 */
contract Cerberus is Initializable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
    mapping(bytes32 => address) contracts;

    function initialize() public {
        _setupRole(MINTER_ROLE, minter);
        _setupRole(BURNER_ROLE, burner);
    }
}
