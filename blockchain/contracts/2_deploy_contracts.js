// Contracts
const LiquidityPool = artifacts.require('LiquidityPool');
const SignoToken = artifacts.require('SignoToken');
const GovernorAlpha = artifacts.require('GovernorAlpha');
const TimeLockV2 = artifacts.require('TimeLockV2');

module.exports = async function(deployer, network, accounts) {
    // const THREE_DAYS = 259200;
    // const SIX_MONTHS_IN_BLOCKS = 1051333; // assuming 15 second blocks
    // const BLOCK_NUMBER = 22;
    // // Contracts
    // await deployer.deploy(SignoToken);
    // await deployer.deploy(TimeLockV2, accounts[0], THREE_DAYS);
    // await deployer.deploy(
    //     LiquidityPool,
    //     SignoToken.address,
    //     accounts[0],
    //     web3.utils.toWei('100'),
    //     BLOCK_NUMBER,
    //     BLOCK_NUMBER + SIX_MONTHS_IN_BLOCKS
    // );
    // const LiquidityPoolD = await LiquidityPool.deployed();
    // const SignoD = await SignoToken.deployed();
    // await SignoD.transferOwnership(LiquidityPoolD.address);
    // await deployer.deploy(GovernorAlpha, TimeLockV2.address, SignoToken.address, accounts[0]);
};
