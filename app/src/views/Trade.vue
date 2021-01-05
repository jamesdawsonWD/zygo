<template>
    <div class="trade">
        <Panels namePanelA="Buy" namePanelB="Sell">
            <form class="buy-form" slot="panelA">
                <StandardCurrencyInput label="From" id="fromUSDT" placeHolder="0.000" currency="USDT" />
                <DownArrow class="arrow" />
                <SelectCurrencyInput
                    label="To"
                    id="toToken"
                    placeHolder="0.000"
                    placeholderCurrency="USDT"
                    @assetSelected="setActiveAsset"
                    :tokens="exampleTokens"
                />
                <ChartView :assetInfo="activeAsset" />
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
            <div slot="panelB">
                <form class="buy-form" slot="panelA">
                    <SelectCurrencyInput
                        label="From"
                        id="toToken"
                        placeHolder="0.000"
                        placeholderCurrency="USDT"
                        @assetSelected="setActiveAsset"
                        :tokens="exampleTokens"
                    />
                    <DownArrow class="arrow" />
                    <StandardCurrencyInput label="To" id="fromUSDT" placeHolder="0.000" currency="USDT" />
                    <ChartView :assetInfo="activeAsset" />
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
            </div>
        </Panels>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Button from '@/components/generics/Button.vue';
import Panels from '@/components/generics/PaneledBox.vue';
import StandardCurrencyInput from '@/components/forms/StandardCurrencyInput.vue';
import SelectCurrencyInput from '@/components/forms/SelectCurrencyInput.vue';
import DownArrow from '@/assets/svg/down-arrow.svg';
import ChartView from '@/components/charts/ChartView.vue';
import ActionInfo from '@/components/generics/ActionInfo.vue';

// import Button from '@/components/generics/Button.vue';
export default {
    name: 'Trade',
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
        Panels,
        StandardCurrencyInput,
        SelectCurrencyInput,
        DownArrow,
        ChartView,
        ActionInfo
    }
};
</script>
<style lang="scss">
.trade {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: start;
    margin-top: 150px;
}

.arrow {
    margin-top: 10px;
    transform: scale(0.6);
    path {
        fill: var(--button-color);
    }
}
</style>
