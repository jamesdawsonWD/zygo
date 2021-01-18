const Factory = artifacts.require('UniswapV2Factory.sol');
const WETH = artifacts.require('WETH.sol');
const Test = artifacts.require('Test.sol');

module.exports = async function(deployer, _network, accounts) {
    await deployer.deploy(WETH);
    await deployer.deploy(Test);
    const weth = await WETH.deployed();
    const test = await Test.deployed();

    await deployer.deploy(Factory, accounts[0], { from: accounts[0] });

    console.log(weth.address, test.address);
    const factory = await Factory.deployed();
    console.log(factory.address);
    // await factory.createPair(test.address, weth.address, { from: accounts[0], gasLimit: 10000000 });
    console.log(await factory.getPair(test.address, weth.address));
};
