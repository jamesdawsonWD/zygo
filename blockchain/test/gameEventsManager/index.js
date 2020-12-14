import { takeSnapshot, revertSnapshot } from '../_utils/evm';
import { addGameEvent, generateGameEvent, newTestEventProxy } from '../_helpers/gameEventsManager';
import { gameStorageAddress } from '../_helpers/gameStorage';
import { deployProxy } from '@openzeppelin/truffle-upgrades';
import { RandomC, GameEventsManagerC, GameEventsStorageC } from '../_utils/artifacts';
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
        let ProxyGameEventsManager;
        // Setup
        before(async () => {
            TestEventA = await newTestEventProxy();
            TestEventB = await newTestEventProxy();
            TestEventC = await newTestEventProxy();

            const gameEventStorage = await GameEventsStorageC.deployed();

            totalEventsBefore = await getTotalGameEvents(Owner);

            const Random = await RandomC.deployed();
            console.log(gameEventStorage.address, gameStorageAddress(), Random.address, Owner);
            ProxyGameEventsManager = await deployProxy(GameEventsManagerC, [
                await gameStorageAddress(),
                gameEventStorage.address,
                Random.address,
                Owner
            ]);

            const total = await getTotalGameEvents(Owner);
        });

        // Proxy
        it('should add generate a number between 1 and the total number of gameEvents(Proxy)', async () => {
            await addGameEvent(TestEventA, Owner);
            await addGameEvent(TestEventB, Owner);
            await addGameEvent(TestEventC, Owner);
            const results = await generateGameEvent(Owner);
            const total = await getTotalGameEvents(Owner);
            assert.ok(results.toString() > '0' && results.toString() <= total.toString());
        });

        // Deployed
        it('should add generate a number between 1 and the total number of gameEvents', async () => {
            await addGameEvent(TestEventA, Owner);
            await addGameEvent(TestEventB, Owner);
            await addGameEvent(TestEventC, Owner);
            const results = await generateGameEvent(Owner);
            const total = await getTotalGameEvents(Owner);
            assert.ok(results.toString() > '0' && results.toString() <= total.toString());
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

            const tx = await ProxyGameEventsManager.trigger(UserA, { from: Owner });
            const results = rawEventsExist(['Start(uint256,address)'], tx);
            assert.ok(results.passed);
        });
        it('should trigger a single GameEvent correctly', async () => {
            await ProxyGameEventsManager.add(TestEventA, { from: Owner });
            const gameEventId = new BigNumber(totalEventsBefore).toNumber() + 1;
            await setUserAddressToGameEvent(UserA, gameEventId, Owner);

            const tx = await ProxyGameEventsManager.trigger(UserA, { from: Owner });
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
    });
}
