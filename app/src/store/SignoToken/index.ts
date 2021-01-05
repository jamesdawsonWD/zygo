import { Module } from 'vuex';
import { RootState, SyntheticTokens } from '../types';

export const state: SyntheticTokens = {

};

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = false;

export const syntheticTokens: Module<SyntheticTokens, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
