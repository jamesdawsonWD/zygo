// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {Initializable} from '@openzeppelin/upgrades/contracts/Initializable.sol';
import {Types} from './lib/Types.sol';
import {ITreasury} from './interfaces/ITreasury.sol';
import {GameStorage} from './GameStorage.sol';
import {IGameEvent} from './interfaces/IGameEvent.sol';
import {IRandom} from './interfaces/IRandom.sol';
import {IGameEventsStorage} from './interfaces/IGameEventsStorage.sol';

contract GameEventsManager is Initializable {
    GameStorage GS;
    IGameEventsStorage GES;
    ITreasury TS;
    IRandom RAND;
    address traverse;
    event AddGameEvent(uint256 _eventId, address _address);
    event LogCreatePlanet(uint256 indexed _eventId, address indexed _reciever);
    event LogGiveSats(uint256 indexed _eventId, address indexed _reciever);

    modifier isEvent(uint256 eventId) {
        require(msg.sender == GS.getGameEventIdToAddress(eventId), 'Sender must be a registered event');
        _;
    }

    modifier isTraverse() {
        require(msg.sender == traverse, 'Only the traversing contract');
        _;
    }

    /**
     *   Initialize - init function
     *   @param _gameStorage - the address of the games eternal storage
     */
    function initialize(
        address _gameStorage,
        address _gameEventsStorage,
        address _random,
        address _traverse
    ) public initializer {
        GS = GameStorage(_gameStorage);
        GES = IGameEventsStorage(_gameEventsStorage);
        RAND = IRandom(_random);
        traverse = _traverse;
        TS = ITreasury(GS.getTreasuryAddress());
    }

    /**
     *  generate - Generates a random GameEvent id
     *  @return a random GameEvent Id
     */
    function generate() public returns (uint256) {
        // TODO: Add weighted discoverery of events
        return RAND.randomrange(1, GS.getTotalGameEvents());
    }

    /**
     *  add - Adds a new game event contract
     *  @param gameEvent - the address of the game Event contract
     */
    function add(address gameEvent) public {
        uint256 id = GS.getTotalGameEvents() + 1;
        IGameEvent(gameEvent).initialize(id, address(this), address(GES));
        GS.setGameEventIdToAddress(id, gameEvent);
        GS.setTotalGameEvents(id);
        emit AddGameEvent(id, gameEvent);
    }

    function trigger(address user) public isTraverse {
        uint256 _id = GS.getUserAddressToGameEvent(user);
        address _address = GS.getGameEventIdToAddress(_id);
        require(_address != address(0), 'This game event does not exist');
        IGameEvent(_address).start(user);
    }

    function createPlanet(
        uint256 yieldLow,
        uint256 yieldHigh,
        address to,
        uint256 eventId
    ) public isEvent(eventId) {
        uint256 yield = RAND.randomrange(yieldLow, yieldHigh);
        uint256 _id = GS.incrementTotalPlanets();
        GS.setTokenIdToYield(_id, yield);
        TS.mintPlanet(to, _id);
        emit LogCreatePlanet(eventId, to);
    }

    function giveSats(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        uint256 eventId
    ) public isEvent(eventId) {
        emit LogGiveSats(eventId, to);
        TS.sendSats(to, ids, amounts);
    }

    function takeSats(
        address from,
        uint256[] memory ids,
        uint256[] memory amounts,
        uint256 eventId
    ) public isEvent(eventId) {
        TS.recieveSats(from, ids, amounts);
    }

    function giveSolar(
        address to,
        uint256 amount,
        uint256 eventId
    ) public isEvent(eventId) {
        TS.sendSolar(to, amount);
    }

    function takeSolar(
        address from,
        uint256 amount,
        uint256 eventId
    ) public isEvent(eventId) {
        TS.recieveSolar(from, amount);
    }
}
