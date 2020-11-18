pragma solidity 0.6.12;
import {IGameEventsManager} from '../interfaces/IGameEventsManager.sol';

contract GE_TestEvent {
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
    }

    function complete() private {}
}
