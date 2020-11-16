pragma solidity 0.6.12;

contract GE_DiscoverPlanet {
    event Start(uint256 indexed eventId, address indexed user, bool begun);
    event Initialize(uint256 indexed eventId);
    uint256 eventId;

    function initialize(uint256 _eventId) public {
        eventId = _eventId;
        emit Initialize(_eventId);
        start(msg.sender);
    }

    function start(address user) public {
        emit Start(eventId, user, true);
    }

    function reward() private {}
}
