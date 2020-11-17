import { GameEventsC } from '../_utils/artifacts';
import { TestGameEventC } from '../_utils/artifacts';
export async function gameEventsAddress() {
    const GameEvents = await GameEventsC.deployed();
    return GameEvents.address;
}
export async function generateGameEvent(from) {
    const GameEvents = await GameEventsC.deployed();
    return await GameEvents.generate({ from });
}
export async function triggerGameEvent(user, from) {
    const GameEvents = await GameEventsC.deployed();
    return await GameEvents.trigger(user, { from });
}
export async function addGameEvent(gameEvent, from) {
    const GameEvents = await GameEventsC.deployed();
    return await GameEvents.add(gameEvent, { from });
}
export async function updateGameEvent(gameEventId, gameEvent, from) {
    const GameEvents = await GameEventsC.deployed();
    return await GameEvents.update(gameEventId, gameEvent, { from });
}

export async function newTestEvent() {
    const GameEvent = await TestGameEventC.new();
    return GameEvent.address;
}
