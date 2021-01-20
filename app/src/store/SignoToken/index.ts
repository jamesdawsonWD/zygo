import { Module } from 'vuex';
import { RootState, SignoToken } from '../types';

export const state: SignoToken = {
    balance: '0'
};

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = false;

export const signoToken: Module<SignoToken, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
