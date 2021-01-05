import { MutationTree } from 'vuex';
import { Network, NetworkData } from '../types';

export const mutations: MutationTree<Network> = {
    SET_WEB3: (state: Network, payload: any) => (state.web3 = payload),
    SET_NETWORK_DATA: (state: Network, payload: NetworkData) => (state.networkData = payload),
    SET_ADDRESS: (state: Network, payload: string) => (state.userAddress = payload),
    ADD_SIGNO_TOKEN_CONTRACT: (state: Network, payload: { SIGNO_TOKEN_CONTRACT: string }) => (state.contracts.signoToken = payload.SIGNO_TOKEN_CONTRACT),
    ADD_EMP: (state: Network, payload: { EMP_CONTRACT: any; address: string }) => {
        state.contracts.EMPs = {
            ...state.contracts.EMPs,
            ...{
                [payload.address]: payload.EMP_CONTRACT
            }
        };
    },
    ADD_SYNTHETIC_TOKEN_CONTRACT: (state: Network, payload: { SYNTHETIC_TOKEN_CONTRACT: any; address: string }) => {
        state.contracts.syntheticTokens = {
            ...state.contracts.syntheticTokens,
            ...{
                [payload.address]: payload.SYNTHETIC_TOKEN_CONTRACT
            }
        };

    }
};
