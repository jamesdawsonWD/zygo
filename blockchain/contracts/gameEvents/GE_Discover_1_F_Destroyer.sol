pragma solidity 0.6.12;
import {IGameEventsManager} from '../interfaces/IGameEventsManager.sol';

contract GE_Discover_1_F_Destroyer {
    event Start(uint256 indexed eventId, address indexed user);
    event Initialize(uint256 indexed eventId);

    uint256 public eventId;
    IGameEventsManager public gameEventsManager;

    function initialize(uint256 _eventId, address _gameEventsManager) public {
        eventId = _eventId;
        gameEventsManager = IGameEventsManager(_gameEventsManager);
        emit Initialize(_eventId);
    }

    function start(address user) public {
        emit Start(eventId, user);
        uint256[] memory ids = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);

        ids[0] = 1;
        amounts[0] = 1;

        gameEventsManager.giveSats(user, ids, amounts, eventId);
    }

    function complete() private {}
}
