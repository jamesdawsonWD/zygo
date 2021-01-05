import { MutationTree } from 'vuex';
import { SyntheticTokens } from '../types';

export const mutations: MutationTree<SyntheticTokens> = {
    SET_SYNTHETIC_TOKEN_SYMBOL: (state: SyntheticTokens, payload: { tokenAddress: string; tokenSymbol: string }) => {
        const syntheticToken = {
            ...state[payload.tokenAddress],
            symbol: payload.tokenSymbol
        };
        state[payload.tokenAddress] = syntheticToken;
    },
    SET_SYNTHETIC_TOKEN_NAME: (state: SyntheticTokens, payload: { tokenAddress: string; tokenName: string }) => {
        const syntheticToken = {
            ...state[payload.tokenAddress],
            name: payload.tokenName
        };
        state[payload.tokenAddress] = syntheticToken;
        console.log(payload, state);
    },
};
