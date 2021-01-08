<template>
    <div class="stake">
        <Box>
            <PriceView asset="SIG" price="22.73 USDT" slot="boxContent" />
        </Box>
        <Box> <PriceView asset="SIG Volume (24hr)" price="22.73 USDT" slot="boxContent" /> </Box>
        <Box> <PriceView asset="SIG Circulating Supply" price="22.73 USDT" slot="boxContent" /> </Box>
        <Box
            @click.native="openModal"
            class="pool"
            :class="{ 'first-pool': index == 1 }"
            v-for="(item, index) in examplePools"
            :key="index"
        >
            <StakeAsset :pool="item.pool" :totalStaked="item.totalStaked" :APR="item.APR" slot="boxContent"
        /></Box>
    </div>
</template>

<script lang="ts">
import Box from '@/components/generics/Box.vue';
import { mapActions } from 'vuex';
import PriceView from '@/components/generics/PriceView.vue';
import StakeAsset from '@/components/generics/StakeAsset.vue';
export default {
    name: 'Stake',
    data() {
        const examplePools = {
            1: {
                pool: 'SIG-USDT',
                APR: '246%',
                totalStaked: '234.2'
            },
            2: {
                pool: 'SIG-USDT',
                APR: '246%',
                totalStaked: '234.2'
            },
            3: {
                pool: 'SIG-USDT',
                APR: '246%',
                totalStaked: '234.2'
            },
            4: {
                pool: 'SIG-USDT',
                APR: '246%',
                totalStaked: '234.2'
            },
            5: {
                pool: 'SIG-USDT',
                APR: '246%',
                totalStaked: '234.2'
            },
            6: {
                pool: 'SIG-USDT',
                APR: '246%',
                totalStaked: '234.2'
            },
            7: {
                pool: 'SIG-USDT',
                APR: '246%',
                totalStaked: '234.2'
            }
        };
        return {
            examplePools
        };
    },
    methods: {
        // depositAmount: function(deposit: Deposit) {
        //     this.deposit(deposit);
        // }
        ...mapActions(['UIM_openModal']),

        openModal() {
            this.UIM_openModal({
                show: true,
                content: 'stake'
            });
        }
    },
    components: {
        // DepositForm,
        // Modal,
        Box,
        PriceView,
        StakeAsset
    }
};
</script>
<style lang="scss">
.stake {
    position: relative;
    display: grid;
    justify-content: center;
    width: auto;
    align-items: start;
    margin: 150px 300px 0 300px;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 50px;
    grid-column-gap: 100px;
    padding-bottom: 100px;
    .box {
        width: auto;
        margin: 0;
    }

    .pool {
        transition: 0.2s;
        &:hover {
            transform: scale(1.02);
            cursor: pointer;
        }
    }

    .first-pool {
        -webkit-box-shadow: 0px 0px 13px 3px var(--button-color);
        box-shadow: 0px 0px 13px 3px var(--button-color);
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
