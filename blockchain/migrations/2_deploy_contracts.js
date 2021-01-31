const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
const MockERC20 = artifacts.require('MockERC20.sol');
const IUniswapV2Pair = artifacts.require('IUniswapV2Pair.sol');
const ZygoToken = artifacts.require('ZygoToken.sol');
const ZygoProtocol = artifacts.require('ZygoProtocol.sol');
const SimpleOracle = artifacts.require('SimpleOracle.sol');
const WETH = artifacts.require('WETH.sol');

module.exports = async function(deployer, _network, accounts) {
    const UNISWAP_ROUTERV2 = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
    const UNISWAP_FACTORY = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    const WETH_ADDRESS = '0xa1C74a9A3e59ffe9bEe7b85Cd6E91C0751289EbD';

    await deployer.deploy(ZygoToken);
    const zygo = await ZygoToken.deployed();
    await zygo.mint(accounts[0], web3.utils.toWei('100000', 'ether'));

    const factory = await Factory.at(UNISWAP_FACTORY);
    const router = await Router.at(UNISWAP_ROUTERV2);
    const weth = await WETH.at(WETH_ADDRESS);

    const tx1 = await zygo.approve(router.address, web3.utils.toWei('40000', 'ether'), {
        from: accounts[0]
    });
    await weth.sendTransaction({ from: accounts[0], value: web3.utils.toWei('2', 'ether') });
    await weth.approve(router.address, web3.utils.toWei('2', 'ether'), {
        from: accounts[0]
    });
    const allowance = await zygo.allowance(accounts[0], router.address, { from: accounts[0] });
    const wethAllowance = await weth.allowance(accounts[0], router.address, { from: accounts[0] });

    console.log(allowance.toString(), wethAllowance.toString());
    console.log(tx1.receipt.logs[0].args.spender == router.address);

    const zygoBal = await zygo.balanceOf(accounts[0]);
    const wethBal = await weth.balanceOf.call(accounts[0]);

    console.log(zygoBal.toString(), wethBal.toString());

    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    const timestamp = block.timestamp + 300;

    console.log(weth.address, ZygoToken.address);
    const tx = await router.addLiquidity(
        weth.address,
        zygo.address,
        web3.utils.toWei('0.1', 'ether'),
        web3.utils.toWei('3.5', 'ether'),
        web3.utils.toWei('0.01', 'ether'),
        web3.utils.toWei('1.5', 'ether'),
        accounts[0],
        timestamp,
        { gas: 4000000 }
    );

    console.log(tx);
    await deployer.deploy(SimpleOracle, factory.address, weth.address, zygo.address);
    await deployer.deploy(ZygoProtocol, zygo.address, weth.address, SimpleOracle.address);

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
