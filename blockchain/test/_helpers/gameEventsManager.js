import { GameEventsManagerC } from '../_utils/artifacts';
import { TestGameEventC } from '../_utils/artifacts';
export async function gameEventsManagerAddress() {
    const GameEventsManager = await GameEventsManagerC.deployed();
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

export async function newTestEvent() {
    const GameEvent = await TestGameEventC.new();
    return GameEvent.address;
}
