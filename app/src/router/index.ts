import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Trade from '../views/Trade.vue';
import Governance from '../views/Governance.vue';
import MarketView from '../views/MarketView.vue';
import Mint from '../views/Mint.vue';
import Pool from '../views/Pool.vue';
import Stake from '../views/Stake.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Trade',
        component: Trade
    },
    {
        path: '/governance',
        name: 'Governance',
        component: Governance
    },
    {
        path: '/mint',
        name: 'Mint',
        component: Mint
    },
    {
        path: '/stake',
        name: 'Stake',
        component: Stake
    },
    {
        path: '/pool',
        name: 'Pool',
        component: Pool
    }

];

const router = new VueRouter({
    routes
});

export default router;
