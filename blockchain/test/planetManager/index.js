import { takeSnapshot, revertSnapshot } from '../_utils/evm';
import { mintFhr } from '../_helpers/planetToken';
import { SYSTEM_TYPES } from '../lib/testValues';
import { createPlanet, getPlanetImplementation } from '../_helpers/planetManager';
import { planetAddress, getYield } from '../_helpers/planet';
import { treasuryAddress } from '../_helpers/treasury';
import { testMintPlanetToken } from '../_helpers/planetToken';
import { setTokenIdToYield } from '../_helpers/gameStorage';
import { satAddress } from '../_helpers/sat';
import truffleAssert from 'truffle-assertions';
export default function() {
    contract('PlanetManager', async accounts => {
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

        // Setup
        before(async () => {
            await testMintPlanetToken(UserA, 1, Owner);
            await setTokenIdToYield(1, 100, Owner);
        });

        it('should create a planet', async () => {
            const receipt = await createPlanet(1, Owner);
            const proxyAddress = receipt.logs[0].args.proxy;
            const proxyYield = await getYield(proxyAddress, Owner);
            assert.equal(proxyYield.toString(), 100);
        });
    });
}
