<template>
    <div class="pool">
        <Panels namePanelA="Provide" namePanelB="Withdraw">
            <form class="buy-form" slot="panelA">
                <SelectCurrencyInput
                    label="Asset"
                    id="toToken"
                    placeHolder="0.000"
                    placeholderCurrency="USDT"
                    @assetSelected="setActiveAsset"
                    @amountEntered="setToAmount"
                    :tokens="exampleTokens"
                />
                <Plus class="plus" />
                <StandardCurrencyInput label="USDT" id="fromUSDT" placeHolder="0.000" currency="USDT" />
                <ActionInfo v-if="trade.from.amount != 0 || trade.to.amount != 0" :actionInfo="actionInfo" />
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
                        label="LP"
                        id="toToken"
                        placeHolder="0.000"
                        placeholderCurrency="USDT"
                        @assetSelected="setActiveAsset"
                        @amountEntered="setFromAmount"
                        :tokens="exampleTokens"
                    />
                    <DownArrow class="arrow" />
                    <StandardCurrencyInput label="To" id="fromUSDT" placeHolder="0.000" currency="USDT" />
                    <ActionInfo
                        v-if="trade.from.amount != 0 || trade.to.amount != 0"
                        :actionInfo="actionInfo"
                    />
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
import Plus from '@/assets/svg/plus.svg';
import ActionInfo from '@/components/generics/ActionInfo.vue';

// import Button from '@/components/generics/Button.vue';
export default {
    name: 'Pool',
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
            trade: {
                from: {
                    amount: '',
                    asset: ''
                },
                to: {
                    amount: '',
                    asset: ''
                }
            },
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
            console.log(item);
        },
        setToAmount(amount) {
            this.trade.to.amount = amount;
        },
        setFromAmount(amount) {
            this.trade.from.amount = amount;
        }
    },
    components: {
        // DepositForm,
        // Modal,
        Button,
        Panels,
        StandardCurrencyInput,
        SelectCurrencyInput,
        Plus,
        ActionInfo,
        DownArrow
    }
};
</script>
<style lang="scss">
.pool {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: start;
    margin-top: 150px;
}

.plus {
    margin-top: 15px;
    margin-bottom: 4px;
    height: 30px;
    transform: scale(0.6);
    path {
        fill: var(--button-color);
    }
}

.arrow {
    margin-top: 10px;
    transform: scale(0.6);
    path {
        fill: var(--button-color);
    }
}
</style>
