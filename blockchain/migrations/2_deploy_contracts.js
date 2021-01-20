const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
const WETH = artifacts.require('WETH.sol');
const MockERC20 = artifacts.require('MockERC20.sol');
const SignoToken = artifacts.require('SignoToken.sol');
const IUniswapV2Pair = artifacts.require('IUniswapV2Pair.sol');
// const MasterChef = artifacts.require('MasterChef.sol');
// const SushiBar = artifacts.require('SushiBar.sol');
// const SushiMaker = artifacts.require('SushiMaker.sol');
// const Migrator = artifacts.require('Migrator.sol');
module.exports = async function(deployer, _network, accounts) {
    await deployer.deploy(WETH);
    const weth = await WETH.deployed();

    await deployer.deploy(SignoToken);
    const tokenA = await MockERC20.new('Token A', 'TKA', web3.utils.toWei('100000', 'ether'));
    const tokenB = await MockERC20.new('Token B', 'TKB', web3.utils.toWei('100000', 'ether'));

    await deployer.deploy(Factory, accounts[0]);
    const factory = await Factory.deployed();
    const wethTokenAPairTX = await factory.createPair(weth.address, tokenA.address);
    const wethSignoPairTX = await factory.createPair(weth.address, SignoToken.address);
    const tokenATokenBPairTX = await factory.createPair(tokenA.address, tokenB.address);

    console.log(tokenATokenBPairTX.logs[0]);
    const wethTokenAPair = wethTokenAPairTX.receipt.logs[0].args.pair;
    const wethSignoPair = wethSignoPairTX.receipt.logs[0].args.pair;
    const tokenATokenBPair = tokenATokenBPairTX.receipt.logs[0].args.pair;

    const tokenATokenBPairC = await IUniswapV2Pair.at(tokenATokenBPair);

    await deployer.deploy(Router, factory.address, weth.address);
    const router = await Router.deployed();
    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    const timestamp = block.timestamp + 300;

    await tokenA.approve(router.address, '2000000000000000000000000');
    await tokenB.approve(router.address, '2000000000000000000000000');

    const tkaapproved = await tokenA.allowance(accounts[0], router.address);
    const tkaBalance = await tokenA.balanceOf(accounts[0]);
    const tkbApproved = await tokenA.allowance(accounts[0], router.address);
    const tkbBalance = await tokenA.balanceOf(accounts[0]);
    console.log(tkbApproved.toString());
    console.log(tkbBalance.toString());
    console.log(tkaBalance.toString());
    const tokenA_amount = web3.utils.toBN('200000000000000000000');
    const tokenB_amount = web3.utils.toBN('200000000000000000000');

    const tx = await router.addLiquidity(
        tokenA.address,
        tokenB.address,
        '4000000000000000000000',
        '100000000000000000000',
        '3999999999999990000000',
        '199999999999999000000',
        accounts[0],
        timestamp,
        { gas: 4000000 }
    );

    console.log(tx);

    const reserves = await tokenATokenBPairC.getReserves();
    console.log(reserves);
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
