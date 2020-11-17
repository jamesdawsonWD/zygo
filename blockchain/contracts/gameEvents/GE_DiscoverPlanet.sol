pragma solidity 0.6.12;

contract GE_DiscoverPlanet {
    event Start(uint256 indexed eventId, address indexed user);
    event Initialize(uint256 indexed eventId);
    struct YieldRange {
        uint256 low,
        uint256 high
    }

    uint256 eventId;
    YieldRange storage range;
    function initialize(uint256 _eventId, address gameEventsManager) public {
        eventId = _eventId;
        range = YieldRange({
            low: 0,
            high: 200
        })
        emit Initialize(_eventId);
    }

    function start(address user) public {
        emit Start(eventId, user);

    }

    function complete() private {}
}
