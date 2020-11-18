pragma solidity 0.6.12;
import {IGameEventsManager} from '../interfaces/IGameEventsManager.sol';

contract GE_DiscoverMediumYieldPlanet {
    event Start(uint256 indexed eventId, address indexed user);
    event Initialize(uint256 indexed eventId);

    struct YieldRange {
        uint256 low;
        uint256 high;
    }

    uint256 public eventId;
    IGameEventsManager public gameEventsManager;
    YieldRange public range;

    function initialize(uint256 _eventId, address _gameEventsManager) public {
        eventId = _eventId;
        range = YieldRange({low: 201, high: 400});
        gameEventsManager = IGameEventsManager(_gameEventsManager);
        emit Initialize(_eventId);
    }

    function start(address user) public {
        emit Start(eventId, user);
        gameEventsManager.createPlanet(range.low, range.high, user, eventId);
    }

    function complete() private {}
}
