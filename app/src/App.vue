<template>
    <div id="app">
        <Header />
        <router-view />
        <Modal v-if="ShowModal" @close="UIM_closeModal" />
    </div>
</template>
<script lang="ts">
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Modal from '@/components/generics/Modal.vue';
import Header from '@/components/Header.vue';
// import Button from '@/components/generics/Button.vue';
export default {
    name: 'App',
    computed: {
        ...mapGetters(['ShowModal'])
    },
    components: {
        // DepositForm,
        Modal,
        Header
        // Button
    },
    methods: {
        ...mapActions(['setAddress'])
        // depositAmount: function(deposit: Deposit) {
        //     this.deposit(deposit);
        // }
    },

    async mounted() {
        window.ethereum.on('accountsChanged', async accounts => {
            console.log(accounts[0]);
            if (accounts[0]) this.setAddress({ address: accounts[0] });
        });
        // await this.getBalance();
        // await this.getTsunoBalance();
        // await this.getDateUnlocked();
    }
};
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    background-color: var(--bg-color);
    overflow: scroll;
    overflow-x: hidden;
    /* Increase/decrease this value for cross-browser compatibility */
    box-sizing: content-box;
    /* So the width will be 100% + 17px */
}

.background {
    position: fixed;
    top: 0;
    left: -1px;
    width: 102vw;
    z-index: -100;
}
</style>
