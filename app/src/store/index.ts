import Vue from 'vue';
import Vuex from 'vuex';
import { network } from './Network';
import { emps } from './EMPs';
import { syntheticTokens } from './SyntheticTokens';
import { userInterfaceManager } from './UserInterfaceManager';
import { signoToken } from './SignoToken';
import { swapPairs } from './SwapPairs';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        version: '1.0.0' // a simple property
    },
    mutations: {},
    actions: {},
    modules: {
        network,
        emps,
        syntheticTokens,
        userInterfaceManager,
        signoToken,
        swapPairs
    },
    plugins: []
});
