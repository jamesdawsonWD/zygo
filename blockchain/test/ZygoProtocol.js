import { takeSnapshot, revertSnapshot } from './_utils/evm';
import { setup } from './_utils/deploy';
import { advanceTime } from './_utils/evm';
import { ethers } from 'ethers';
import truffleAssert from 'truffle-assertions';

contract('ZygoProtocol', async accounts => {
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
        const { factory, zygo, weth, router, oracle, zygoProtocol, tka } = await setup(Owner, UserA, UserB);
        Contracts.factory = factory;
        Contracts.zygo = zygo;
        Contracts.weth = weth;
        Contracts.router = router;
        Contracts.oracle = oracle;
        Contracts.zygoProtocol = zygoProtocol;
        Contracts.tka = tka;
    });
    it('create() - should create a new order', async () => {
        await Contracts.weth.approve(
            Contracts.zygoProtocol.address,
            web3.utils.toWei('200000000000', 'ether')
        );
        await Contracts.zygo.approve(
            Contracts.zygoProtocol.address,
            web3.utils.toWei('200000000000', 'ether')
        );

        await Contracts.zygoProtocol.create(
            Contracts.weth.address,
            web3.utils.toWei('5', 'ether'),
            Contracts.tka.address,
            web3.utils.toWei('20', 'ether')
        );
    });
    it('fill() - should fill an order', async () => {
        await Contracts.weth.approve(
            Contracts.zygoProtocol.address,
            web3.utils.toWei('200000000000', 'ether')
        );
        await Contracts.zygo.approve(
            Contracts.zygoProtocol.address,
            web3.utils.toWei('200000000000', 'ether')
        );

        const fromAmount = web3.utils.toWei('5', 'ether');
        const toAmount = web3.utils.toWei('20', 'ether');

        const tx = await Contracts.zygoProtocol.create(
            Contracts.weth.address,
            fromAmount,
            Contracts.tka.address,
            toAmount
        );

        const orderId = tx.receipt.logs[0].args.orderId;
        const order = await Contracts.zygoProtocol.orders.call(orderId);
        const tkaBalanceBefore = await Contracts.tka.balanceOf(UserA);
        const zygoBefore = await Contracts.zygo.balanceOf(UserA);
        await Contracts.tka.approve(
            Contracts.zygoProtocol.address,
            web3.utils.toWei('200000000000', 'ether'),
            { from: UserA }
        );

        await Contracts.zygoProtocol.fill(orderId.toString(), { from: UserA });

        const tkaBalanceAfter = await Contracts.tka.balanceOf(UserA);
        const zygoAfter = await Contracts.zygo.balanceOf(UserA);

        assert.ok(
            web3.utils
                .toBN(zygoAfter)
                .sub(web3.utils.toBN(zygoBefore))
                .eq(web3.utils.toBN(fromAmount))
        );
        assert.ok(
            web3.utils
                .toBN(tkaBalanceBefore)
                .sub(web3.utils.toBN(tkaBalanceAfter))
                .eq(web3.utils.toBN(toAmount))
        );
    });
});
