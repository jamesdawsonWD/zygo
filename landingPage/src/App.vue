<template>
    <div class="app">
        <router-view />
        <Modal v-if="showModal" @close="flipModal">
            <AlphaSignUp />
        </Modal>
    </div>
</template>
<script lang="ts">
import Modal from '@/components/generics/Modal.vue';
import AlphaSignUp from '@/components/forms/AlphaSignup.form.vue';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

// import Button from '@/components/generics/Button.vue';
export default {
    name: 'App',
    components: {
        Modal,
        AlphaSignUp
    },
    methods: {
        ...mapActions(['flipModal'])
    },
    computed: {
        ...mapGetters(['showModal'])
    }
};
</script>
<style lang="scss">
.app {
    height: 100%;
    width: 100vw;
    overflow-x: hidden;
}
</style>
