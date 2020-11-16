import { takeSnapshot, revertSnapshot } from '../_utils/evm';
import { addGameEvent, generateGameEvent, triggerGameEvent, newTestEvent } from '../_helpers/gameEvents';
import { getTotalGameEvents } from '../_helpers/gameStorage';
import { rawEventsExist } from '../_utils/base';
import truffleAssert from 'truffle-assertions';
export default function() {
    contract('GameOperations#Move', async accounts => {
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

        //
        // Deposit
        //

        it('should add a new GameEvent correctly', async () => {
            const tx = await addGameEvent(TestEventA, Owner);
            console.log(tx.receipt.rawLogs);
            const results = rawEventsExist(['Initialize(uint256)', 'Start(uint256,address,bool)'], tx);
            console.log(JSON.stringify(results.events[1].args));
        });
    });
}
