import { getTxEventParams, SYSTEM_TYPES_IDS } from '@/utils/index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, SignoToken, TxResult } from '../types';
import Web3 from 'web3';

export const actions: ActionTree<SignoToken, RootState> = {
    async SIG_balanceOf(context: ActionContext<SignoToken, RootState>) {
        const { SignoToken, Address } = context.getters;
        return SignoToken.methods
            .balanceOf(Address)
            .call({ from: Address })
            .then((balance: string) => {
                console.log(balance)
                context.commit('SET_SIG_BALANCE', { balance })
            })
            .catch((err: Error) => context.dispatch('setError', err));
    }

};
