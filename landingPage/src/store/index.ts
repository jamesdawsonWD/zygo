import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        modal: false
    },
    mutations: {
        SET_MODEL: state => (state.modal = !state.modal)
    },
    actions: {
        flipModal(context) {
            context.commit('SET_MODEL');
        },
        sendSignUpEmail(context, payload) {
            console.log(payload, process.env.VUE_APP_API_URL);
            const body = {
                name: payload.name,
                address: payload.address,
                to: payload.email,
                subject: "Alpha Signup Successful",
                template: "alpha-signup"
            }
            axios.post(`${process.env.VUE_APP_API_URL}/api/emails/`, body).then((res) => console.log(res)).catch(err => console.log(err));
        }
    },
    getters: {
        showModal: state => state.modal
    },
    modules: {}
});
