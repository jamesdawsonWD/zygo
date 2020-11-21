pragma solidity 0.6.12;
import {IGameEventsStorage} from '../interfaces/IGameEventsStorage.sol';
import {IGameEventsManager} from '../interfaces/IGameEventsManager.sol';

contract GE_DiscoverPlanet {
    event Start(uint256 indexed eventId, address indexed user);
    event Initialize(uint256 indexed eventId);

    IGameEventsManager public gameEventsManager;
    IGameEventsStorage public gameEventsStorage;

    modifier onlyManager() {
        require(msg.sender == address(gameEventsManager), 'Only manager can access this');
        _;
    }

    function initialize(
        uint256 _eventId,
        address _gameEventsManager,
        address _gameEventsStorage
    ) public {
        gameEventsStorage = IGameEventsStorage(_gameEventsStorage);
        gameEventsManager = IGameEventsManager(_gameEventsManager);
        gameEventsStorage.setUint(keccak256(abi.encodePacked('gameEvent.DiscoverPlanet.yieldLow')), 1);
        gameEventsStorage.setUint(keccak256(abi.encodePacked('gameEvent.DiscoverPlanet.yieldHigh')), 200);
        gameEventsStorage.setUint(keccak256(abi.encodePacked('gameEvent.DiscoverPlanet.eventId')), _eventId);
        emit Initialize(_eventId);
    }

    function start(address user) public onlyManager() {
        uint256 yieldLow = gameEventsStorage.getUint(
            keccak256(abi.encodePacked('gameEvent.DiscoverPlanet.yieldLow'))
        );
        uint256 yieldHigh = gameEventsStorage.getUint(
            keccak256(abi.encodePacked('gameEvent.DiscoverPlanet.yieldHigh'))
        );
        uint256 eventId = gameEventsStorage.getUint(
            keccak256(abi.encodePacked('gameEvent.DiscoverPlanet.eventId'))
        );
        emit Start(eventId, user);
        gameEventsManager.createPlanet(yieldLow, yieldHigh, user, eventId);
    }

    function complete() private {}
}
