import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Trade from '../views/Trade.vue';
import FleetManagerView from '../views/FleetManagerView.vue';
import MarketView from '../views/MarketView.vue';
import Mint from '../views/Mint.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Trade',
        component: Trade
    },
    {
        path: '/fleetManager',
        name: 'FleetManagerView',
        component: FleetManagerView
    },
    {
        path: '/mint',
        name: 'Mint',
        component: Mint
    },
    {
        path: '/market',
        name: 'MarketView',
        component: MarketView
    }
];

const router = new VueRouter({
    routes
});

export default router;
