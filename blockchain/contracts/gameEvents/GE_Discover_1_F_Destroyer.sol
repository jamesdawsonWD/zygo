pragma solidity 0.6.12;
import {IGameEventsStorage} from '../interfaces/IGameEventsStorage.sol';
import {IGameEventsManager} from '../interfaces/IGameEventsManager.sol';

contract GE_Discover_1_F_Destroyer {
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
        gameEventsStorage.setUint(
            keccak256(abi.encodePacked('gameEvent.Discover_1_F_Destroyer.rewardId')),
            1
        );
        gameEventsStorage.setUint(
            keccak256(abi.encodePacked('gameEvent.Discover_1_F_Destroyer.rewardAmount')),
            1
        );
        gameEventsStorage.setUint(
            keccak256(abi.encodePacked('gameEvent.Discover_1_F_Destroyer.eventId')),
            _eventId
        );
        emit Initialize(_eventId);
    }

    function start(address user) public onlyManager() {
        uint256[] memory ids = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);

        uint256 id = gameEventsStorage.getUint(
            keccak256(abi.encodePacked('gameEvent.Discover_1_F_Destroyer.rewardId'))
        );
        uint256 amount = gameEventsStorage.getUint(
            keccak256(abi.encodePacked('gameEvent.Discover_1_F_Destroyer.rewardAmount'))
        );
        uint256 eventId = gameEventsStorage.getUint(
            keccak256(abi.encodePacked('gameEvent.Discover_1_F_Destroyer.eventId'))
        );

        ids[0] = id;
        amounts[0] = amount;

        emit Start(eventId, user);
        gameEventsManager.giveSats(user, ids, amounts, eventId);
    }

    function complete() private {}
}
