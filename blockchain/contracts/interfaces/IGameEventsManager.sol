// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

interface IGameEventsManager {
    function createPlanet(
        uint256 yieldLow,
        uint256 yieldHigh,
        address to,
        uint256 eventId
    ) external;

    function giveSats(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        uint256 eventId
    ) external;

    function takeSats(
        address from,
        uint256[] memory ids,
        uint256[] memory amounts,
        uint256 eventId
    ) external;

    function giveSolar(address to, uint256 amount) external;

    function takeSolar(address from, uint256 amount) external;
}
