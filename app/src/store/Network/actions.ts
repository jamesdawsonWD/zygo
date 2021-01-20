import { state } from './index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, Network } from '../types';
import Web3 from 'web3';
// import EMP from '@/../../blockchain/build/contracts/ExpiringMultiParty.json';
import SyntheticToken from '@/../../blockchain/build/contracts/SyntheticToken.json';
import SignoToken from '@/../../blockchain/build/contracts/SignoToken.json';
import UniswapV2Pair from '@/../../blockchain/build/contracts/UniswapV2Pair.json';
import UniswapV2Router02 from '@/../../blockchain/build/contracts/UniswapV2Router02.json';
export const actions: ActionTree<Network, RootState> = {
    setupWeb3(context: ActionContext<Network, RootState>) {
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            window.ethereum.enable().then((enabled: boolean) => console.log(enabled));
            web3.eth.ens;
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        } else {
            // TODO better handle of metamask
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
        context.commit('SET_WEB3', web3);
    },
    async getNetworkData(context: ActionContext<Network, RootState>) {
        const { Web3 } = context.getters;
        const network = await Web3.eth.net.getNetworkType();
        const networkId = await Web3.eth.net.getId();
        const currentBlock = await Web3.eth.getBlockNumber();
        context.commit('SET_NETWORK_DATA', {
            network,
            networkId,
            currentBlock
        });
    },
    async setAddress(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3 } = context.getters;
        context.commit('SET_ADDRESS', payload.address);
    },
    async bootstrapContracts(context: ActionContext<Network, RootState>) {
        await context.dispatch('setupWeb3');
        await context.dispatch('getNetworkData');
        await context.dispatch('NETWORK_setupSignoToken', { address: '0xe7e3162ad645fa27a6720c971f5c3f97c963aad7' });
        await context.dispatch('NETWORK_setupPair', { address: '0x481dd11D3E4734Eb5ea20076b0E4314Cb94179D9' });
        await context.dispatch('NETWORK_setupSwapRouter', { address: '0x2C2D1FAE743F752d8dbd965358845F5824dB3D37' });
    },

    async NETWORK_setupEMP(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3, NetworkId } = context.getters;
        // const EMP_CONTRACT = new Web3.eth.Contract(EMP.abi, payload.address);
        // await context.commit('ADD_EMP', { EMP_CONTRACT, address: payload.address });
    },
    async NETWORK_setupSyntheticToken(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3, NetworkId } = context.getters;
        // const SYNTHETIC_TOKEN_CONTRACT = new Web3.eth.Contract(SyntheticToken.abi, payload.address);
        // await context.commit('ADD_SYNTHETIC_TOKEN_CONTRACT', { SYNTHETIC_TOKEN_CONTRACT, address: payload.address });
        // await context.dispatch('ST_name', { tokenAddress: payload.address })
        // await context.dispatch('ST_symbol', { tokenAddress: payload.address })
    },
    async NETWORK_setupSignoToken(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3, NetworkId } = context.getters;
        const SIGNO_TOKEN_CONTRACT = new Web3.eth.Contract(SignoToken.abi, payload.address);
        console.log(SIGNO_TOKEN_CONTRACT);
        await context.commit('ADD_SIGNO_TOKEN_CONTRACT', { SIGNO_TOKEN_CONTRACT, address: payload.address });
    },
    async NETWORK_setupSwapRouter(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3, NetworkId } = context.getters;
        const SWAP_ROUTER_CONTRACT = new Web3.eth.Contract(UniswapV2Router02.abi, payload.address);
        await context.commit('ADD_SWAP_ROUTER_CONTRACT', { SWAP_ROUTER_CONTRACT, address: payload.address });
    },
    async NETWORK_setupPair(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3, NetworkId } = context.getters;
        const PAIR_CONTRACT = new Web3.eth.Contract(UniswapV2Pair.abi, payload.address);
        console.log(PAIR_CONTRACT);
        await context.commit('ADD_PAIR_CONTRACT', { PAIR_CONTRACT, address: payload.address });
        await context.dispatch('PAIR_getPair', { address: payload.address })
    }
};

interface Networks {
    [key: string]: Record<string, any>;
}
