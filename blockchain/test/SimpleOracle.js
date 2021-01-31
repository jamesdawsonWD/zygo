import { takeSnapshot, revertSnapshot } from './_utils/evm';
import { setup } from './_utils/deploy';
import { advanceTime } from './_utils/evm';
import { ethers } from 'ethers';
import truffleAssert from 'truffle-assertions';

contract('SimpleOracle', async accounts => {
    // Accounts
    const [Owner, UserA, UserB, UserC, UserD] = accounts;
    const TEN_MINUTES = 1800;
    const Contracts = {};
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
        const { factory, zygo, weth, router, oracle, pair } = await setup(Owner, UserA, UserB);
        Contracts.factory = factory;
        Contracts.zygo = zygo;
        Contracts.weth = weth;
        Contracts.router = router;
        Contracts.oracle = oracle;
        Contracts.pair = pair;
    });

    it('update() - should retrieve priceCumulativeLast from the correct pair', async () => {
        const reserves = await pair.getReserves();
        const price0CumulativeFirst = await pair.price0CumulativeLast.call();
        const price1CumulativeFirst = await pair.price1CumulativeLast.call();
        assert.equal(price0CumulativeFirst.toString(), '0');
        assert.equal(price1CumulativeFirst.toString(), '0');

        await advanceTime(TEN_MINUTES);
        const blockNumber = await web3.eth.getBlockNumber();
        const block = await web3.eth.getBlock(blockNumber);
        const timestamp = block.timestamp + 3000;
        await Contracts.router.swapExactTokensForTokens(
            web3.utils.toWei('10', 'ether'),
            web3.utils.toWei('1', 'ether'),
            [weth.address, zygo.address],
            Owner,
            timestamp
        );
        await oracle.update();

        const price0CumulativeLast = await Contracts.pair.price0CumulativeLast.call();
        const price1CumulativeLast = await Contracts.pair.price1CumulativeLast.call();
        assert.ok(price0CumulativeLast.toString() != '0');
        assert.ok(price1CumulativeLast.toString() != '0');
    });
});
