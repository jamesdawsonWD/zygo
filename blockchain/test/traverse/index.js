import { takeSnapshot, revertSnapshot } from '../_utils/evm';
import {
    TraverseC,
    GameEventsManagerC,
    GameStorageC,
    GameEventsStorageC,
    RandomC
} from '../_utils/artifacts';
import { move } from '../_helpers/traverse';
import {
    getMasterFleetPosition,
    getUserAddressToGameEvent,
    getTotalGameEvents
} from '../_helpers/gameStorage';
import { deployProxy } from '@openzeppelin/truffle-upgrades';
import truffleAssert from 'truffle-assertions';
export default function() {
    contract('GameOperations#Move', async accounts => {
        // Accounts
        const [Owner, UserA, UserB, UserC, UserD] = accounts;

        const pos1 = [2, 1, 7, 42];
        const pos2 = [3, 4, 2, 344];
        const outOfBounds = [7, 77, 66, 1333000];
        // State snapshotting
        let snapshotId;
        beforeEach(async () => {
            snapshotId = await takeSnapshot(web3);
        });
        afterEach(async () => {
            await revertSnapshot(web3, snapshotId);
        });

        let random;
        let gameStorage;
        let gameEventsStorage;
        let gameEventsManagerProxy;
        let traverseProxy;

        // Setup
        before(async () => {
            random = await RandomC.deployed();
            gameStorage = await GameStorageC.deployed();
            gameEventsStorage = await GameEventsStorageC.deployed();
            gameEventsManagerProxy = await deployProxy(GameEventsManagerC, [], {
                initializer: false
            });
            traverseProxy = await deployProxy(TraverseC, [], {
                initializer: false,
                unsafeAllowCustomTypes: true
            });

            await traverseProxy.initialize(gameStorage.address, gameEventsManagerProxy.address);
            await gameEventsManagerProxy.initialize(
                gameStorage.address,
                gameEventsStorage.address,
                random.address,
                traverseProxy.address
            );
        });

        //
        // Traverse Contract
        //

        it('should move the user to a new star position', async () => {
            await move(pos1, UserA);
            const actualPos = await getMasterFleetPosition(UserA);
            const gameEvent = await getUserAddressToGameEvent(UserA);
            const totalGameEvents = await getTotalGameEvents(Owner);
            console.log(gameEvent);
            assert.ok(gameEvent > 0 && gameEvent <= totalGameEvents);
            assert.equal(pos1.toString(), actualPos.toString());
        });
        it('should move the user to a new star position(proxy)', async () => {
            await traverseProxy.move(pos1, { from: UserA });
            const actualPos = await getMasterFleetPosition(UserA);
            const gameEvent = await getUserAddressToGameEvent(UserA);
            const totalGameEvents = await getTotalGameEvents(Owner);
            console.log(gameEvent);
            assert.ok(gameEvent > 0 && gameEvent <= totalGameEvents);
            assert.equal(pos1.toString(), actualPos.toString());
        });
        it('should move the user to a new star position and the second time trigger an event', async () => {
            await move(pos1, UserA);
            await move(pos2, UserA);
            const actualPos = await getMasterFleetPosition(UserA);
            const gameEvent = await getUserAddressToGameEvent(UserA);
            const totalGameEvents = await getTotalGameEvents(Owner);

            assert.ok(gameEvent > 0 && gameEvent <= totalGameEvents);
            assert.equal(pos2.toString(), actualPos.toString());
        });
        it('should move the user to a new star position and the second time trigger an event(proxy)', async () => {
            await traverseProxy.move(pos1, { from: UserA });
            await traverseProxy.move(pos2, { from: UserA });
            const actualPos = await getMasterFleetPosition(UserA);
            const gameEvent = await getUserAddressToGameEvent(UserA);
            const totalGameEvents = await getTotalGameEvents(Owner);

            assert.ok(gameEvent > 0 && gameEvent <= totalGameEvents);
            assert.equal(pos2.toString(), actualPos.toString());
        });

        it('should fail if out of bounds', async () => {
            await truffleAssert.fails(
                move(outOfBounds, UserA),
                truffleAssert.ErrorType.revert,
                'Position must be within set limits of the known universe'
            );
        });
        it('should fail if out of bounds(proxy)', async () => {
            await truffleAssert.fails(
                traverseProxy.move(outOfBounds, { from: UserA }),
                truffleAssert.ErrorType.revert,
                'Position must be within set limits of the known universe'
            );
        });

        it('should fail if attempting to move to same position', async () => {
            await move(pos1, UserA),
                await truffleAssert.fails(
                    move(pos1, UserA),
                    truffleAssert.ErrorType.revert,
                    'You cannot move to your current location'
                );
        });
        it('should fail if attempting to move to same position(proxy)', async () => {
            await traverseProxy.move(pos1, { from: UserA }),
                await truffleAssert.fails(
                    traverseProxy.move(pos1, { from: UserA }),
                    truffleAssert.ErrorType.revert,
                    'You cannot move to your current location'
                );
        });
    });
}
