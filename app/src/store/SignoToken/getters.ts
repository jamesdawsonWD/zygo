import { GetterTree } from 'vuex';
import { RootState, SyntheticTokens } from '../types';

export const getters: GetterTree<SyntheticTokens, RootState> = {
    ST_getInfo: state => (tokenAddress: string) => state[tokenAddress],
    ST_getName: state => (tokenAddress: string) => state[tokenAddress].name,
    ST_getSymbol: state => (tokenAddress: string) => state[tokenAddress].symbol,
    ST_getAll: state => state,
};
