import { MutationTree } from 'vuex';
import { EMPS } from '../types';

export const mutations: MutationTree<EMPS> = {
    SET_EMP_TOKEN_ADDRESS: (state: EMPS, payload: { empAddress: string; tokenAddress: string }) => {
        const empToTokenAddress = {
            [payload.empAddress]: payload.tokenAddress
        };
        state.empToTokenAddresses = { ...state.empToTokenAddresses, ...empToTokenAddress };
    },
};
