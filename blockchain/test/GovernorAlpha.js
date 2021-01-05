import { takeSnapshot, revertSnapshot } from '../_utils/evm';
import { GovernorAlphaC, SignoTokenC, TimeLockC } from './_utils/artifacts';
import { deployProxy } from '@openzeppelin/truffle-upgrades';
import truffleAssert from 'truffle-assertions';

contract('GovernorAlpha', async accounts => {
    // Accounts
    const [Owner, UserA, UserB, UserC, UserD] = accounts;

    let snapshotId;
    let GovernorAlpha;
    let timeLock;
    let signo;
    // State snapshotting
    beforeEach(async () => {
        snapshotId = await takeSnapshot(web3);
    });
    afterEach(async () => {
        await revertSnapshot(web3, snapshotId);
    });

    // Setup
    before(async () => {
        timeLock = await TimeLockC.deployed();
        signo = await SignoTokenC.deployed();
        GovernorAlpha = await GovernorAlphaC.deployed();
    });

    //
    // Traverse Contract
    //

    it('should add a new proposal', async () => {
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
