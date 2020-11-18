// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {Initializable} from '@openzeppelin/upgrades/contracts/Initializable.sol';
import {Types} from './lib/Types.sol';
import {ITreasury} from './interfaces/ITreasury.sol';
import {GameStorage} from './GameStorage.sol';
import {IGameEvent} from './interfaces/IGameEvent.sol';
import {Random} from './Random.sol';

contract GameEventsManager is Initializable, Random {
    GameStorage GS;
    ITreasury TS;

    event AddGameEvent(uint256 _eventId, address _address);
    event LogCreatePlanet(uint256 indexed _eventId, address indexed _reciever);
    event LogGiveSats(uint256 indexed _eventId, address indexed _reciever);

    /**
     *   Initialize - init function
     *   @param _gameStorage - the address of the games eternal storage
     */
    function initialize(address _gameStorage) public initializer {
        GS = GameStorage(_gameStorage);
        TS = ITreasury(GS.getTreasuryAddress());
    }

    /**
     *  generate - Generates a random GameEvent id
     *  @return a random GameEvent Id
     */
    function generate() public returns (uint256) {
        return randomrange(0, GS.getTotalGameEvents());
    }

    /**
     *  add - Adds a new game event contract
     *  @param gameEvent - the address of the game Event contract
     */
    function add(address gameEvent) public {
        uint256 id = GS.getTotalGameEvents() + 1;
        IGameEvent(gameEvent).initialize(id, address(this));
        GS.setGameEventIdToAddress(id, gameEvent);
        GS.setTotalGameEvents(id);
        emit AddGameEvent(id, gameEvent);
    }

    function update(uint256 gameEventId, address gameEvent) public {
        IGameEvent(gameEvent).initialize(gameEventId, address(this));
        GS.setGameEventIdToAddress(gameEventId, gameEvent);
        emit AddGameEvent(gameEventId, gameEvent);
    }

    function trigger(address user) public {
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
    ) public {
        uint256 yield = randomrange(yieldLow, yieldHigh);
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
    ) public {
        emit LogGiveSats(eventId, to);
        TS.sendSats(to, ids, amounts);
    }

    function takeSats(
        address from,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public {
        TS.recieveSats(from, ids, amounts);
    }

    function giveSolar(address to, uint256 amount) public {
        TS.sendSolar(to, amount);
    }

    function takeSolar(address from, uint256 amount) public {
        TS.recieveSolar(from, amount);
    }
}
