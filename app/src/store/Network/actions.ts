import { state } from './index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, Network } from '../types';
import Web3 from 'web3';
import EMP from '@/../../blockchain/build/contracts/ExpiringMultiParty.json';
import SyntheticToken from '@/../../blockchain/build/contracts/SyntheticToken.json';
import SignoToken from '@/../../blockchain/build/contracts/SignoToken.json';
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
    async getAddress(context: ActionContext<Network, RootState>) {
        const { Web3 } = context.getters;
        const accounts = await Web3.eth.getAccounts();
        context.commit('SET_ADDRESS', accounts[0]);
    },
    async bootstrapContracts(context: ActionContext<Network, RootState>, payload) {
        const setupWeb3 = context.dispatch('setupWeb3');
        const network = context.dispatch('getNetworkData');
        const address = context.dispatch('getAddress');
        await Promise.all([setupWeb3, network, address]);

        await context.dispatch('NETWORK_setupSignoToken', { address: '0x5c812A6D3e775CA2c5527d8Bf67abea1eb2e1d57' });
    },

    // async setupGameOperations(context: ActionContext<Network, RootState>) {
    //     const { Web3, NetworkId } = context.getters;
    //     const networks: Networks = GameOperations.networks;
    //     const master = new Web3.eth.Contract(GameOperations.abi, networks[NetworkId].address);
    //     context.commit('SET_GAMEOPERATIONS', master);
    // },

    async NETWORK_setupEMP(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3, NetworkId } = context.getters;
        const EMP_CONTRACT = new Web3.eth.Contract(EMP.abi, payload.address);
        await context.commit('ADD_EMP', { EMP_CONTRACT, address: payload.address });
    },
    async NETWORK_setupSyntheticToken(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3, NetworkId } = context.getters;
        const SYNTHETIC_TOKEN_CONTRACT = new Web3.eth.Contract(SyntheticToken.abi, payload.address);
        await context.commit('ADD_SYNTHETIC_TOKEN_CONTRACT', { SYNTHETIC_TOKEN_CONTRACT, address: payload.address });
        await context.dispatch('ST_name', { tokenAddress: payload.address })
        await context.dispatch('ST_symbol', { tokenAddress: payload.address })
    },
    async NETWORK_setupSignoToken(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3, NetworkId } = context.getters;
        const SIGNO_TOKEN_CONTRACT = new Web3.eth.Contract(SignoToken.abi, payload.address);
        await context.commit('ADD_SIGNO_TOKEN_CONTRACT', { SIGNO_TOKEN_CONTRACT, address: payload.address });

    }
};

interface Networks {
    [key: string]: Record<string, any>;
}
