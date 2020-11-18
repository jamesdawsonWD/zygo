import { takeSnapshot, revertSnapshot } from '../_utils/evm';
import { DiscoverPlanetStart, DiscoverPlanetAddress } from '../_helpers/gameEvents/GE_DiscoverPlanet';
import { planetTokenBalanceOf } from '../_helpers/planetToken';
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
    contract('GE_DiscoverPlanet', async accounts => {
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
            userBalanceBefore = await planetTokenBalanceOf(UserA, Owner);
        });

        // It should pass
        it('should add a single GameEvent correctly', async () => {
            const tx = await DiscoverPlanetStart(UserA, Owner);
            const results = rawEventsExist(['LogCreatePlanet(uint256,address)'], tx);
            const userBalanceAfter = await planetTokenBalanceOf(UserA, Owner);
            assert.ok(results.passed);
            assert.equal(
                new BigNumber(userBalanceAfter).toNumber(),
                new BigNumber(userBalanceBefore).toNumber() + 1
            );
        });
    });
}
