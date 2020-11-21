import { takeSnapshot, revertSnapshot } from '../_utils/evm';
import { move } from '../_helpers/traverse';
import {
    getMasterFleetPosition,
    getUserAddressToGameEvent,
    getTotalGameEvents
} from '../_helpers/gameStorage';
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

        // Setup
        before(async () => {});

        //
        // Deposit
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
        it('should move the user to a new star position and the second time trigger an event', async () => {
            await move(pos1, UserA);
            await move(pos2, UserA);
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

        it('should fail if attempting to move to same position', async () => {
            await move(pos1, UserA);
            await truffleAssert.fails(
                move(pos1, UserA),
                truffleAssert.ErrorType.revert,
                'You cannot move to your current location'
            );
        });
    });
}
