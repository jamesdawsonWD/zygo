import { MutationTree } from 'vuex';
import { SwapPairs } from '../types';

export const mutations: MutationTree<SwapPairs> = {

    SET_PAIR_INFO: (state: SwapPairs, payload: { address: string, name: string; token0: string, token1: string, price0CumulativeLast: string, price1CumulativeLast: string }) => {
        const pair = {
            name: payload.name,
            token0: payload.token0,
            token1: payload.token1,
            price0CumulativeLast: payload.price0CumulativeLast,
            price1CumulativeLast: payload.price1CumulativeLast
        };
        state.pairs[payload.address] = pair;
        console.log(state.pairs);
    },
};
