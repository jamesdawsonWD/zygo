const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
const MockERC20 = artifacts.require('MockERC20.sol');
const ZygoToken = artifacts.require('ZygoToken.sol');
const IUniswapV2Pair = artifacts.require('IUniswapV2Pair.sol');
const SimpleOracle = artifacts.require('SimpleOracle.sol');
module.exports = async function(deployer, _network, accounts) {
    await deployer.deploy(ZygoToken);
    const zygo = await ZygoToken.deployed();
    await zygo.mint(accounts[0], web3.utils.toWei('100000', 'ether'));
    const weth = await MockERC20.new('Wrapped Ether', 'WETH', web3.utils.toWei('100000', 'ether'));

    await deployer.deploy(Factory, accounts[0]);
    const factory = await Factory.deployed();
    const wethZygoPairTX = await factory.createPair(weth.address, ZygoToken.address);

    console.log(wethZygoPairTX.logs[0]);
    const wethZygoPair = wethZygoPairTX.receipt.logs[0].args.pair;

    console.log('WETH-ZYGO PAIR: ', wethZygoPair);
    await deployer.deploy(Router, factory.address, weth.address);
    const router = await Router.deployed();
    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    const timestamp = block.timestamp + 300;

    await weth.approve(router.address, '2000000000000000000000000');
    await zygo.approve(router.address, '2000000000000000000000000');

    const tokenA_amount = web3.utils.toBN('200000000000000000000');
    const tokenB_amount = web3.utils.toBN('200000000000000000000');

    const tx = await router.addLiquidity(
        weth.address,
        zygo.address,
        '4000000000000000000000',
        '100000000000000000000',
        '3999999999999990000000',
        '199999999999999000000',
        accounts[0],
        timestamp,
        { gas: 4000000 }
    );

    const wethZygoPairC = await IUniswapV2Pair.at(wethZygoPair);
    const balance = await wethZygoPairC.balanceOf(accounts[0]);

    console.log(balance.toString());

    // console.log(decoded);
    //     address tokenA,
    // address tokenB,
    // uint256 amountADesired,
    // uint256 amountBDesired,
    // uint256 amountAMin,
    // uint256 amountBMin,
    // address to,
    // uint256 deadline

    // await deployer.deploy(SushiToken);
    // const sushiToken = await SushiToken.deployed();

    // await deployer.deploy(MasterChef, sushiToken.address, admin, web3.utils.toWei('100'), 1, 1);
    // const masterChef = await MasterChef.deployed();
    // await sushiToken.transferOwnership(masterChef.address);

    // await deployer.deploy(SushiBar, sushiToken.address);
    // const sushiBar = await SushiBar.deployed();

    // await deployer.deploy(SushiMaker, factory.address, sushiBar.address, sushiToken.address, weth.address);
    // const sushiMaker = await SushiMaker.deployed();
    // await factory.setFeeTo(sushiMaker.address, { from: addresses[0] });

    // await deployer.deploy(
    //     Migrator,
    //     masterChef.address,
    //     '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    //     factory.address,
    //     1
    // );
};
