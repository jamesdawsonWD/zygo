import { takeSnapshot, revertSnapshot } from '../_utils/evm';
import { GE_Discover_1_F_DestroyerStart } from '../_helpers/gameEvents/GE_Discover_1_F_Destroyer';
import { satBalanceOf } from '../_helpers/sat';
import { triggerGameEvent } from '../_helpers/gameEventsManager';

import { rawEventsExist } from '../_utils/base';
import BigNumber from 'bignumber.js';

import truffleAssert from 'truffle-assertions';
export default function() {
    contract('GE_Discover_1_F_Destroyer', async accounts => {
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

        let userBalanceBefore;
        // Setup
        before(async () => {
            userBalanceBefore = await satBalanceOf(UserA, 1, Owner);
        });

        it('should add a single GameEvent correctly', async () => {
            const tx = await GE_Discover_1_F_DestroyerStart(UserA, Owner);
            const results = rawEventsExist(['LogGiveSats(uint256,address)'], tx);
            const userBalanceAfter = await satBalanceOf(UserA, 1, Owner);
            console.log(userBalanceBefore);
            assert.ok(results.passed);
            assert.equal(
                new BigNumber(userBalanceAfter).toNumber(),
                new BigNumber(userBalanceBefore).toNumber() + 1
            );
        });

        it('should trigger through game events correctly', async () => {
            const tx = await GE_Discover_1_F_DestroyerStart(UserA, Owner);
            const results = rawEventsExist(['LogGiveSats(uint256,address)'], tx);
            const userBalanceAfter = await satBalanceOf(UserA, 1, Owner);
            console.log(userBalanceBefore);
            assert.ok(results.passed);
            assert.equal(
                new BigNumber(userBalanceAfter).toNumber(),
                new BigNumber(userBalanceBefore).toNumber() + 1
            );
        });
    });
}
