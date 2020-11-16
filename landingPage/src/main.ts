import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'; // import lottie-vuejs

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.extend(LottieAnimation);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
import '@/styles/index.scss';
import * as Utils from '@/utils';
Object.defineProperty(Vue.prototype, '$utils', { value: Utils });
document.title = 'Space-DX';
