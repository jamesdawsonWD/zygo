import { MutationTree } from 'vuex';
import { SignoToken } from '../types';

export const mutations: MutationTree<SignoToken> = {

    SET_SIG_BALANCE: (state: SignoToken, payload: { balance: string }) => {
        state.balance = payload.balance;
    },
};
