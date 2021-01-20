import { getTxEventParams, SYSTEM_TYPES_IDS } from '@/utils/index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, SyntheticTokens, TxResult } from '../types';
import Web3 from 'web3';

export const actions: ActionTree<SyntheticTokens, RootState> = {
    async ST_balanceOf(context: ActionContext<SyntheticTokens, RootState>, payload: { tokenAddress: string }) {
        const { SyntheticTokens, Address } = context.getters;
        const ST = SyntheticTokens(payload.tokenAddress);

        return ST.methods
            .balanceOf(Address)
            .call({ from: Address })
            .then((balance: string) => {
                return balance;
            })
            .catch((err: Error) => context.dispatch('setError', err));
    },
    async ST_symbol(context: ActionContext<SyntheticTokens, RootState>, payload: { tokenAddress: string }) {
        const { SyntheticTokens, Address } = context.getters;
        const ST = SyntheticTokens(payload.tokenAddress);

        ST.methods
            .symbol()
            .call({ from: Address })
            .then((tokenSymbol: string) => {
                context.commit('SET_SYNTHETIC_TOKEN_SYMBOL', { tokenAddress: payload.tokenAddress, tokenSymbol });
            })
            .catch((err: Error) => context.dispatch('setError', err));
    },
    async ST_name(context: ActionContext<SyntheticTokens, RootState>, payload: { tokenAddress: string }) {
        const { SyntheticTokens, Address } = context.getters;
        const ST = SyntheticTokens(payload.tokenAddress);

        ST.methods
            .name()
            .call({ from: Address })
            .then((tokenName: string) => {
                context.commit('SET_SYNTHETIC_TOKEN_NAME', { tokenAddress: payload.tokenAddress, tokenName });
            })
            .catch((err: Error) => context.dispatch('setError', err));
    },
    async ST_decimals(context: ActionContext<SyntheticTokens, RootState>, payload: { tokenAddress: string }) {
        const { SyntheticTokens, Address } = context.getters;
        const ST = SyntheticTokens(payload.tokenAddress);

        ST.methods
            .decimals()
            .call({ from: Address })
            .then((tokenName: string) => {
                context.commit('SET_SYNTHETIC_TOKEN_NAME', { tokenAddress: payload.tokenAddress, tokenName });
            })
            .catch((err: Error) => context.dispatch('setError', err));
    },

};
