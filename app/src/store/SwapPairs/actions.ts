import { getTxEventParams, SYSTEM_TYPES_IDS } from '@/utils/index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, SwapPairs, TxResult } from '../types';

export const actions: ActionTree<SwapPairs, RootState> = {
    async PAIR_getPair(context: ActionContext<SwapPairs, RootState>, payload: { address: string }) {
        const { SwapPairs, Address } = context.getters;
        const pair = SwapPairs(payload.address);
        const price0CumulativeLastP = pair.methods
            .price0CumulativeLast()
            .call({ from: Address })
        const price1CumulativeLastP = pair.methods
            .price1CumulativeLast()
            .call({ from: Address })
        const token0P = pair.methods
            .token0()
            .call({ from: Address })
        const token1P = pair.methods
            .token1()
            .call({ from: Address })
        return Promise.all([
            price0CumulativeLastP,
            price1CumulativeLastP,
            token0P,
            token1P
        ]).then(([price0CumulativeLast, price1CumulativeLast, token0, token1]) => {
            context.commit('SET_PAIR_INFO', { address: payload.address, name: 'test', price0CumulativeLast, price1CumulativeLast, token0, token1 });
        }).catch((err: Error) => context.dispatch('setError', err));
    },

    async PAIR_swap(context: ActionContext<SwapPairs, RootState>, payload: { address: string, amount0: string, amount1: string, defaultOrder: boolean }) {
        const { PAIRS_getPairInfo, SwapRouter, Address, Web3 } = context.getters;
        const pair = PAIRS_getPairInfo(payload.address);

        console.log(pair, payload);
        const assetOrder = payload.defaultOrder ? [payload.amount0, payload.amount1] : [payload.amount1, payload.amount0];
        const tokenOrder = payload.defaultOrder ? [pair.token0, pair.token1] : [pair.token1, pair.token0];

        Web3.eth.getBlock('latest', (error: any, block: any) => {
            const deadline = block.timestamp
            console.log(deadline);
            return SwapRouter.methods.swapExactTokensForTokens(assetOrder[0], assetOrder[1], tokenOrder, Address, deadline + 300)
                .send({ from: Address })
                .then((info: string[]) => {
                    console.log(info)
                }).catch((err: Error) => context.dispatch('setError', err));
        })
    },

};
