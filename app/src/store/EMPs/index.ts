import { Module } from 'vuex';
import { RootState, EMPS } from '../types';

export const state: EMPS = {
    empToTokenAddresses: {}
};

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = false;

export const emps: Module<EMPS, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
