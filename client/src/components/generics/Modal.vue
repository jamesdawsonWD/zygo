<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <Hex class="hex-background-image" />
                    <div class="modal-header">
                        <h2 name="header"></h2>
                        <Cross class="close-cross" @click="$emit('close')" />
                    </div>

                    <div class="modal-body">
                        <slot></slot>
                    </div>

                    <div class="modal-footer"></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cross from '@/assets/svg/cross.svg';
import Hex from '@/assets/svg/20hex-01.svg';
export default {
    components: {
        Cross,
        Hex
    },
    methods: {
        maskClicked(event) {
            console.log(event);
            // check if click is inside the container
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.1s ease;

    h2,
    h3 {
        color: var(--main-black);
    }
}

.modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.modal-container {
    min-width: 300px;
    max-height: 90vh;
    width: 50%;
    padding: 20px 50px;
    background: var(--pink-gradient);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.2s ease;
    border-radius: 25px;
    font-family: Helvetica, Arial, sans-serif;
    overflow: hidden;
    position: relative;

    .hex-background-image {
        left: -350px;
        top: -200px;
        opacity: 0.2;
        position: absolute;
    }
}

.modal-header {
    margin: 35px 0;
    color: #42b983;
    position: relative;
    .close-cross {
        height: 30px;
        fill: var(--dark-pink);
        position: absolute;
        right: 0;
        z-index: 20;
        &:hover {
            cursor: pointer;
            fill: var(--darker-pink);
        }
    }
}
.modal-body {
    margin: 20px 0;
    height: 80%;
    display: flex;
    justify-content: center;
}
.modal-default-button {
    float: right;
} /* * The following styles are
auto-applied to elements with * transition="modal" when their visibility is
toggled * by Vue.js. * * You can easily play with the modal transition by
editing * these styles. */
.modal-enter,
.modal-leave-active {
    opacity: 0;
}
.modal-leave-active {
    opacity: 0;
}
.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    transform: translateY(150px);
}
</style>
