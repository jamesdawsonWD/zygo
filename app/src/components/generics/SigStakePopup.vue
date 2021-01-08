<template>
    <PaneledBox class="stake-popup" namePanelA="Stake" namePanelB="Unstake">
        <form class="stake-form" slot="panelA">
            <StandardCurrencyInput label="Amount" id="fromUSDT" placeHolder="0.000" currency="SIG" />
            <ActionInfo :actionInfo="actionInfo" />
            <Button
                title="STAKE"
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
        <form class="unstake-form" slot="panelB">
            <StandardCurrencyInput label="Amount" id="fromUSDT" placeHolder="0.000" currency="SIG" />
            <ActionInfo :actionInfo="actionInfo" />
            <Button
                title="UNSTAKE"
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
    </PaneledBox>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import StandardCurrencyInput from '@/components/forms/StandardCurrencyInput.vue';
import PaneledBox from '@/components/generics/PaneledBox.vue';
import Button from '@/components/generics/Button.vue';
import ImageCombo from '@/components/generics/ImageCombo.vue';

@Component({
    props: ['pool', 'totalStaked', 'APR'],
    components: {
        StandardCurrencyInput,
        PaneledBox,
        Button,
        ImageCombo
    }
})
export default class StakeAsset extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles';

.stake-form,
.unstake-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
        @include DS_Bold;
        margin-bottom: 10px;
    }
}
.token-icons {
    margin: 20px 10px;
    width: 350px;
}
</style>
