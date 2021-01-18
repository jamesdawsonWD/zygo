// Contracts
const IExpiringMultiPartyCreator = artifacts.require('IExpiringMultiPartyCreator');

module.exports = async function(deployer, network, accounts) {
    // const KOVAN_EMPC = '0xf763d367e1302a16716b6c40783a17c1ac754f2e';
    // const KOVAN_WETH = '0xd0a1e359811322d97991e03f863a0c30c2cf029c';
    // // Contracts
    // const instance = await IExpiringMultiPartyCreator.at(KOVAN_EMPC);
    // const constructorParams = {
    //     expirationTimestamp: '1608398650',
    //     collateralAddress: KOVAN_WETH,
    //     priceFeedIdentifier: '0x4554482f42544300000000000000000000000000000000000000000000000000',
    //     // priceFeedIdentifier: web3.utils.padRight(web3.utils.utf8ToHex('ETH/BTC'), 64),
    //     syntheticName: 'uTest Token USDETH',
    //     syntheticSymbol: 'uTEST-USDETH',
    //     collateralRequirement: { rawValue: web3.utils.toWei('1.5') },
    //     disputeBondPct: { rawValue: web3.utils.toWei('0.1') },
    //     sponsorDisputeRewardPct: { rawValue: web3.utils.toWei('0.1') },
    //     disputerDisputeRewardPct: { rawValue: web3.utils.toWei('0.1') },
    //     minSponsorTokens: { rawValue: '100000000000000' },
    //     withdrawalLiveness: 7200,
    //     liquidationLiveness: 7200,
    //     excessTokenBeneficiary: '0x6FC49837F5D4fc5aB3b4D89748F3457B4bD1da0C'
    // };
    // try {
    //     const tx = await instance.createExpiringMultiParty(constructorParams);
    //     console.log(tx);
    // } catch (err) {
    //     console.log(err);
    // }
};
