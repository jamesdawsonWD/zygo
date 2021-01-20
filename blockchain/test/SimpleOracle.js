import { takeSnapshot, revertSnapshot } from './_utils/evm';
import { setup } from './_utils/deploy';
import { SYSTEM_TYPES } from './lib/testValues';

import { testFhrDiscovery } from './_helpers/gameOperations';
import truffleAssert from 'truffle-assertions';
import { fhrDiscovery } from './explore/scenario-fhr-discovery';

contract('Explore', async accounts => {
    // Accounts
    const [Owner, UserA, UserB, UserC, UserD] = accounts;
    let router;
    let zygo;
    let oracle;
    let weth;
    // State snapshotting
    let snapshotId;
    beforeEach(async () => {
        snapshotId = await takeSnapshot(web3);
    });
    afterEach(async () => {
        await revertSnapshot(web3, snapshotId);
    });

    // Setup
    before(async () => {
        [, zygo, weth, router, oracle] = await setup();
    });
});
