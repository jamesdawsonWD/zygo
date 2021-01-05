<template>
    <div class="mint">
        <Box boxName="Open">
            <form class="mint-form" slot="boxContent">
                <SelectCurrencyInput
                    label="Collateral"
                    id="toToken"
                    placeHolder="0.000"
                    placeholderCurrency="USDT"
                    @assetSelected="setActiveAsset"
                    :tokens="exampleTokens"
                />
                <DownArrow class="arrow" />
                <SelectCurrencyInput
                    label="Minted"
                    id="toToken"
                    placeHolder="0.000"
                    placeholderCurrency="USDT"
                    @assetSelected="setActiveAsset"
                    :tokens="exampleTokens"
                />
                <StandardCurrencyInput
                    class="collateral-ratio-input"
                    label="Collateral Ratio"
                    id="fromUSDT"
                    placeHolder="0.000"
                    currency="%"
                />
                <ActionInfo :actionInfo="actionInfo" />
                <Button
                    title="TRADE"
                    @clicked="
                        EMP_create({
                            numTokens: '11',
                            collateralAmount: '0.002',
                            tokenAddress: '0x65bbb1fec96f75002672195cf13c13e2a27cb415'
                        })
                    "
                    buttonStyle="primary"
                ></Button>
            </form>
        </Box>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Button from '@/components/generics/Button.vue';
import StandardCurrencyInput from '@/components/forms/StandardCurrencyInput.vue';
import SelectCurrencyInput from '@/components/forms/SelectCurrencyInput.vue';
import DownArrow from '@/assets/svg/down-arrow.svg';
import ActionInfo from '@/components/generics/ActionInfo.vue';
import Box from '@/components/generics/Box.vue';

// import Button from '@/components/generics/Button.vue';
export default {
    name: 'Mint',
    computed: {
        ...mapGetters(['GS_getBoundaries'])
    },
    data() {
        const exampleTokens = {
            1: {
                symbol: 'uTEST-WETHBTC',
                name: 'uTEST WETH BTC',
                price: '234.2'
            },
            2: {
                symbol: 'uBond',
                name: 'uBond',
                price: '112'
            },
            3: {
                symbol: 'uBond2',
                name: 'uBond2',
                price: '123.9'
            },
            4: {
                symbol: 'uBond3',
                name: 'uBond3',
                price: '15.8'
            },
            5: {
                symbol: 'uBond4',
                name: 'uBond4',
                price: '221'
            }
        };
        return {
            activeAsset: exampleTokens[1],
            actionInfo: [
                {
                    key: 'Recieved Amount',
                    value: '223.87'
                },
                {
                    key: 'SushiSwap Price',
                    value: '223.87'
                },
                {
                    key: 'Tx Fee',
                    value: '22.31'
                }
            ],
            exampleTokens
        };
    },
    methods: {
        // depositAmount: function(deposit: Deposit) {
        //     this.deposit(deposit);
        // }
        ...mapActions(['EMP_create']),
        setActiveAsset(item) {
            this.activeAsset = item;
        }
    },
    components: {
        // DepositForm,
        // Modal,
        Button,
        StandardCurrencyInput,
        SelectCurrencyInput,
        DownArrow,
        ActionInfo,
        Box
    }
};
</script>
<style lang="scss">
.mint {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: start;
    margin-top: 150px;
}
.collateral-ratio-input {
    margin-top: 25px !important;
}
.arrow {
    margin-top: 10px;
    transform: scale(0.6);
    path {
        fill: var(--button-color);
    }
}
</style>
