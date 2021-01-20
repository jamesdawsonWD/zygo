import { GetterTree } from 'vuex';
import { RootState, SignoToken } from '../types';

export const getters: GetterTree<SignoToken, RootState> = {
    SIG_getBalance: state => state.balance,

};
