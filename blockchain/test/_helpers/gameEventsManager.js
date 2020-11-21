import { GameEventsManagerC, TestGameEventC, GameEventsStorageC } from '../_utils/artifacts';
import { deployProxy, upgradeProxy } from '@openzeppelin/truffle-upgrades';
import { gameStorageAddress } from './gameStorage';

export async function gameEventsManagerAddress() {
    const GameEventsStorage = await GameEventsStorageC.deployed();

    return GameEventsManager.address;
}
export async function generateGameEvent(from) {
    const GameEventsManager = await GameEventsManagerC.deployed();
    return await GameEventsManager.generate({ from });
}
export async function triggerGameEvent(user, from) {
    const GameEventsManager = await GameEventsManagerC.deployed();
    return await GameEventsManager.trigger(user, { from });
}
export async function addGameEvent(gameEvent, from) {
    const GameEventsManager = await GameEventsManagerC.deployed();
    return await GameEventsManager.add(gameEvent, { from });
}
export async function updateGameEvent(gameEventId, gameEvent, from) {
    const GameEventsManager = await GameEventsManagerC.deployed();
    return await GameEventsManager.update(gameEventId, gameEvent, { from });
}

export async function newTestEventProxy() {
    const GameEvent = await deployProxy(TestGameEventC, [], {
        initializer: false
    });
    return GameEvent.address;
}
