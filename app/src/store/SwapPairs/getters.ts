import { GetterTree } from 'vuex';
import { RootState, SwapPairs } from '../types';

export const getters: GetterTree<SwapPairs, RootState> = {
    PAIRS_getName: state => (address: string) => state.pairs[address].name,
    PAIRS_getPairInfo: state => (address: string) => {
        console.log('22', state.pairs, address);
        return state.pairs[address]
    },

};
