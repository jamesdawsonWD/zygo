<template>
    <header class="header">
        <div class="content">
            <h2>Signo<span class="dot">.</span><span class="finance">finance</span></h2>
            <div class="nav">
                <router-link to="/">Trade</router-link>
                <router-link to="/mint">Mint</router-link>
                <router-link to="/pool">Pool</router-link>
                <router-link to="/stake">Stake</router-link>
                <router-link to="/governance">Governance</router-link>
                <button v-if="Address == emptyAddress" class="connect" @click="connectWallet()">
                    Connect
                </button>
                <button v-if="Address != emptyAddress" class="address">{{ Address | shortAddress }}</button>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import DepositForm from '@/components/forms/DepositForm.vue';
import Button from '@/components/generics/Button.vue';

@Component({
    components: {
        DepositForm,
        Button
    },
    methods: {
        ...mapActions([
            'bootstrapContracts',
            'NETWORK_setupEMP',
            'EMP_getTokenAddress',
            'UIM_closeModal',
            'ST_balanceOf',
            'ST_symbol',
            'ST_name',
            'NETWORK_setupSyntheticToken'
        ]),
        async connectWallet() {
            await this.bootstrapContracts();
            // await this.NETWORK_setupEMP({ address: '0x65bbb1fec96f75002672195cf13c13e2a27cb415' });
            // const tokenAddress = await this.EMP_getTokenAddress({
            //     empAddress: '0x65bbb1fec96f75002672195cf13c13e2a27cb415'
            // });
            // await this.NETWORK_setupSyntheticToken({
            //     address: tokenAddress
            // });
            // await this.ST_balanceOf({ tokenAddress });
            // await this.ST_symbol({ tokenAddress });
            // await this.ST_name({ tokenAddress });
        }
    },
    computed: {
        ...mapGetters(['Address'])
    },
    data() {
        return {
            emptyAddress: '0x0000000000000000000000000000000000000000'
        };
    }
})
export default class Header extends Vue {
    @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
    width: 100vw;
    height: auto;
    position: fixed;
    z-index: 10;

    h2 {
        font-size: 20pt;
        .dot {
            color: var(--button-color);
        }
        .finance {
            color: var(--main-secondary);
        }
    }

    .content {
        padding: 0 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--foreground-color);
        top: 0;
        -webkit-box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.05);
        box-shadow: -1px 10px 5px -4px rgba(0, 0, 0, 0.05);

        .logo {
            margin-left: 90px;
            top: 10px;
            height: 50px;
        }

        .nav {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .connect,
        .address {
            width: 100px;
            border: none;
            padding: 10px;
            margin: 0 25px 0 50px;
            border-radius: 12px;
            background: transparent;
            transition: 0.2s;
            font-size: var(--md-font);
            color: var(--button-color);
            border: 3px solid var(--button-color);
            font-weight: 700;
            outline: none;
            &:hover {
                cursor: pointer;
                background: var(--button-color);
                color: white;
            }
        }

        .address {
            width: auto;
            color: white;
            background: var(--button-color);
        }
        a {
            font-weight: bold;
            color: #2c3e50;
            text-decoration: none;
            display: flex;
            font-size: var(--md-font);
            align-items: center;
            height: 50px;
            min-width: 100px;

            padding: 0 10px;
            padding-top: 9px;
            justify-content: center;
            border-bottom: 9px solid var(--foreground-color);
            &.router-link-exact-active {
                color: var(--main-font);
            }

            &:hover,
            &:active,
            &:focus {
                color: var(--main-font);
                border-bottom: 9px solid var(--button-color);
            }
        }
    }
}
</style>
