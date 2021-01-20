import { FactoryC, ZygoTokenC, MockERC20C, RouterC, SimpleOracleC } from './artifacts';
import web3 from 'Web3';
export const setup = async owner => {
    const factory = await FactoryC.new(owner);
    const zygo = await ZygoTokenC.new();
    const weth = await MockERC20C.new('Wrapped Ether', 'WETH', web3.utils.toWei('100000', 'ether'));
    const router = await RouterC.new(factory.address, weth.address);
    const oracle = await SimpleOracleC.new(factory.address, weth.address, zygo.address);
    return [factory, zygo, weth, router, oracle];
};
