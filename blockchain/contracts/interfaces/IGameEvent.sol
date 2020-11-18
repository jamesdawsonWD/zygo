// SPDX-License-Identifier: MIT

pragma solidity ^0.6.2;

interface IGameEvent {
    function initialize(uint256 eventId, address gameEventsManager) external;

    function start(address user) external;

    function reward(address user) external;
}