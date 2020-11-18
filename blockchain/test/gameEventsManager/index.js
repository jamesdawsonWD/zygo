import { takeSnapshot, revertSnapshot } from '../_utils/evm';
import { addGameEvent, updateGameEvent, triggerGameEvent, newTestEvent } from '../_helpers/gameEventsManager';
import {
    getTotalGameEvents,
    getGameEventIdToAddress,
    setUserAddressToGameEvent,
    setGameEventIdToAddress
} from '../_helpers/gameStorage';
import { rawEventsExist } from '../_utils/base';
import BigNumber from 'bignumber.js';

import truffleAssert from 'truffle-assertions';
export default function() {
    contract('gameEventsManager', async accounts => {
        // Accounts
        const [Owner, UserA, UserB, UserC, UserD] = accounts;

        // State snapshotting
        let snapshotId;
        beforeEach(async () => {
            snapshotId = await takeSnapshot(web3);
        });
        afterEach(async () => {
            await revertSnapshot(web3, snapshotId);
        });

        let TestEventA;
        let TestEventB;
        let TestEventC;
        let totalEventsBefore;
        // Setup
        before(async () => {
            TestEventA = await newTestEvent();
            TestEventB = await newTestEvent();
            TestEventC = await newTestEvent();

            totalEventsBefore = await getTotalGameEvents(Owner);
        });

        // It should pass
        it('should add a single GameEvent correctly', async () => {
            const tx = await addGameEvent(TestEventA, Owner);
            const results = rawEventsExist(['Initialize(uint256)'], tx);

            const total = await getTotalGameEvents(Owner);
            const eventAddress = await getGameEventIdToAddress(
                new BigNumber(totalEventsBefore).plus(1),
                Owner
            );
            assert.ok(results.passed);
            assert.equal(eventAddress, TestEventA);
            assert.equal(new BigNumber(total).toNumber(), new BigNumber(totalEventsBefore).toNumber() + 1);
        });
        it('should trigger a single GameEvent correctly', async () => {
            await addGameEvent(TestEventA, Owner);
            const gameEventId = new BigNumber(totalEventsBefore).toNumber() + 1;
            await setUserAddressToGameEvent(UserA, gameEventId, Owner);

            const tx = await triggerGameEvent(UserA, Owner);
            const results = rawEventsExist(['Start(uint256,address)'], tx);
            assert.ok(results.passed);
        });

        it('should add a multiple GameEvents correctly', async () => {
            const txA = await addGameEvent(TestEventA, Owner);
            const resultsA = rawEventsExist(['Initialize(uint256)'], txA);

            const total = await getTotalGameEvents(Owner);
            const eventAddressA = await getGameEventIdToAddress(
                new BigNumber(totalEventsBefore).plus(1),
                Owner
            );
            assert.ok(resultsA.passed);
            assert.equal(eventAddressA, TestEventA);

            const txB = await addGameEvent(TestEventB, Owner);
            const resultsB = rawEventsExist(['Initialize(uint256)'], txB);
            const eventAddressB = await getGameEventIdToAddress(
                new BigNumber(totalEventsBefore).plus(1),
                Owner
            );
            assert.ok(resultsB.passed);
            assert.equal(eventAddressB, TestEventA);
            const txC = await addGameEvent(TestEventC, Owner);
            const resultsC = rawEventsExist(['Initialize(uint256)'], txC);

            const eventAddressC = await getGameEventIdToAddress(
                new BigNumber(totalEventsBefore).plus(1),
                Owner
            );
            assert.ok(resultsC.passed);
            assert.equal(eventAddressC, TestEventA);

            assert.equal(new BigNumber(total).toNumber(), new BigNumber(totalEventsBefore).toNumber() + 1);
        });

        it('should update an existing gameEvent to a new gameEvent', async () => {
            await addGameEvent(TestEventA, Owner);
            const gameEventId = new BigNumber(totalEventsBefore).toNumber() + 1;
            const tx = await updateGameEvent(gameEventId, TestEventB, Owner);
            const total = await getTotalGameEvents(Owner);
            const eventAddress = await getGameEventIdToAddress(gameEventId, Owner);
            const results = rawEventsExist(['Initialize(uint256)'], tx);
            assert.equal(
                results.events[0].args[0],
                gameEventId,
                'EventId must match the eventId in the Initialize event'
            );
            assert.equal(eventAddress, TestEventB, 'Set address must match');
            assert.equal(new BigNumber(total).toNumber(), new BigNumber(totalEventsBefore).toNumber() + 1);
        });
    });
}
