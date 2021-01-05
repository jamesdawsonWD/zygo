<template>
    <header class="header">
        <div><h2>SIGNO</h2></div>
        <div>
            <router-link to="/">Trade</router-link>
            <router-link to="/mint">Mint</router-link>
            <router-link to="/fleetManager">Governance</router-link>
        </div>
    </header>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import DepositForm from '@/components/forms/DepositForm.vue';
import Button from '@/components/generics/Button.vue';

@Component({
    components: {
        DepositForm,
        Button
    }
})
export default class Header extends Vue {
    @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
    padding: 15px;
    height: 40px;
    width: 100%;
    position: fixed;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    background-color: var(--foreground-color);
    top: 0;
    -webkit-box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.15);
    box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.15);
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        & > * {
            margin-right: 20px;

            .nav-icon {
                height: 100px;
                transition: 0.5s;
                &:hover {
                    transform: translateY(10px);
                }
            }
        }
    }
    .logo {
        margin-left: 90px;
        top: 10px;
        height: 50px;
    }
    a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
        display: flex;
        font-size: var(--md-font);
        align-items: center;
        height: 100%;
        min-width: 150px;
        justify-content: center;
        &.router-link-exact-active {
            color: var(--main-font);
        }

        &:hover {
            color: var(--main-font);
        }
    }
}
</style>
