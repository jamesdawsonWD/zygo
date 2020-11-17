// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {Initializable} from '@openzeppelin/upgrades/contracts/Initializable.sol';
import {Types} from './lib/Types.sol';
import {ITreasury} from './interfaces/ITreasury.sol';
import {GameStorage} from './GameStorage.sol';
import {IGameEvent} from './interfaces/IGameEvent.sol';
import {Random} from './Random.sol';

contract GameEvents is Initializable, Random {
    GameStorage GS;
    ITreasury TS;

    event AddGameEvent(uint256 _eventId, address _address);

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
        IGameEvent(gameEvent).initialize(id);
        GS.setGameEventIdToAddress(id, gameEvent);
        GS.setTotalGameEvents(id);
        emit AddGameEvent(id, gameEvent);
    }

    function update(uint256 gameEventId, address gameEvent) public {
        IGameEvent(gameEvent).initialize(gameEventId);
        GS.setGameEventIdToAddress(gameEventId, gameEvent);
        emit AddGameEvent(gameEventId, gameEvent);
    }

    function trigger(address user) public {
        uint256 _id = GS.getUserAddressToGameEvent(user);
        address _address = GS.getGameEventIdToAddress(_id);
        require(_address != address(0), 'This game event does not exist');
        IGameEvent(_address).start(user);
    }

    function createPlanet(address to, uint256 yield) public {
        uint256 _id = GS.incrementTotalPlanets();
        GS.setTokenIdToYield(_id, yield);
        TS.mintPlanet(to, _id);
    }

    function giveSats(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public {
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
