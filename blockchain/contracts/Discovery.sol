// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {Random} from './Random.sol';
import {Types} from './lib/Types.sol';

contract Discovery is Random {
    enum DiscoveryLevels {
        OnlyFederation,
        OnlyAlien,
        AlienAndFederation,
        OnlyAncient,
        OnlyAi,
        AllButAncient,
        All
    }

    function federationShips(uint256 amount) internal returns (Types.SatInfo memory) {
        uint256[4] memory _ids = Types.getFederationShips();

        uint256 pos = randomrange(0, _ids.length);
        uint256 _id = _ids[pos];

        return Types.SatInfo({id: _id, amount: amount});
    }

    function singleFederationShip(uint256 amount) internal returns (Types.SatInfo memory) {
        uint256[4] memory _ids = Types.getFederationShips();

        uint256 pos = randomrange(0, _ids.length);
        uint256 _id = _ids[pos];

        return Types.SatInfo({id: _id, amount: 1});
    }

    function singleAllNonAncientShips() internal returns (Types.SatInfo memory) {
        uint256[12] memory _ids = Types.getAllNonAncientShips();

        uint256 pos = randomrange(0, _ids.length);
        uint256 _id = _ids[pos];

        return Types.SatInfo({id: _id, amount: 1});
    }

    function randomSystemType() internal returns (Types.SystemType systemType, uint256 rand) {}

    function getRandomYield(Types.SystemType systemType) public view returns (uint16 rand) {}
}
