import { Module } from 'vuex';
import { RootState, SwapPairs } from '../types';

export const state: SwapPairs = {
    pairs: {}
};

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = false;

export const swapPairs: Module<SwapPairs, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
