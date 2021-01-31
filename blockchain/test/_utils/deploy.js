import {
    FactoryC,
    ZygoTokenC,
    MockERC20C,
    RouterC,
    SimpleOracleC,
    IUniswapV2PairC,
    ZygoProtocolC,
    WETHC
} from './artifacts';
import { advanceTime } from './evm';

export const setup = async (owner, userA, userB) => {
    const zygo = await ZygoTokenC.new();
    await zygo.mint(owner, web3.utils.toWei('200000000000', 'ether'));
    await zygo.mint(userA, web3.utils.toWei('200000000000', 'ether'));
    await zygo.mint(userB, web3.utils.toWei('200000000000', 'ether'));
    const weth = await WETHC.new();
    await weth.deposit({ value: web3.utils.toWei('2000000', 'ether'), from: owner });
    await weth.deposit({ value: web3.utils.toWei('2000000', 'ether'), from: userA });
    await weth.deposit({ value: web3.utils.toWei('2000000', 'ether'), from: userB });
    const tka = await MockERC20C.new('Token A', 'TKA', web3.utils.toWei('200000000', 'ether'));
    await tka.mint(userA, web3.utils.toWei('200000000000', 'ether'));
    await tka.mint(userB, web3.utils.toWei('200000000000', 'ether'));
    const factory = await FactoryC.new(owner);
    const wethZygoTx = await factory.createPair(weth.address, zygo.address);

    const pair = await IUniswapV2PairC.at(wethZygoTx.receipt.logs[0].args.pair);
    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    const timestamp = block.timestamp + 300;
    const router = await RouterC.new(factory.address, weth.address);
    await weth.approve(router.address, web3.utils.toWei('200000000000', 'ether'));
    await zygo.approve(router.address, web3.utils.toWei('200000000000', 'ether'));
    await tka.approve(router.address, web3.utils.toWei('200000000000', 'ether'));

    await router.addLiquidity(
        weth.address,
        zygo.address,
        web3.utils.toWei('20000', 'ether'),
        web3.utils.toWei('1000000', 'ether'),
        web3.utils.toWei('1.5', 'ether'),
        web3.utils.toWei('3.5', 'ether'),
        owner,
        timestamp,
        { gas: 4000000 }
    );
    await router.addLiquidity(
        weth.address,
        tka.address,
        web3.utils.toWei('20000', 'ether'),
        web3.utils.toWei('1000', 'ether'),
        web3.utils.toWei('1.5', 'ether'),
        web3.utils.toWei('3.5', 'ether'),
        owner,
        timestamp,
        { gas: 4000000 }
    );

    await router.swapExactTokensForTokens(
        web3.utils.toWei('10', 'ether'),
        web3.utils.toWei('1', 'ether'),
        [weth.address, zygo.address],
        owner,
        timestamp
    );

    const THIRTY_MINS = 1800;
    const oracle = await SimpleOracleC.new(factory.address, weth.address, zygo.address);
    await advanceTime(THIRTY_MINS);

    await oracle.update();
    const zygoProtocol = await ZygoProtocolC.new(zygo.address, weth.address, pair.address, oracle.address);
    await zygo.transferOwnership(zygoProtocol.address);

    return { factory, zygo, weth, router, oracle, pair, zygoProtocol, tka };
};
