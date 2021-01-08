<template>
    <div class="stake-asset">
        <div class="title">
            {{ pool }}
        </div>
        <ImageCombo firstCombo="DAI" secondCombo="TETHER" />
        <div class="info">
            <div class="apr">
                <div class="sub-title">APR</div>
                <div>{{ APR }}</div>
            </div>
            <div class="staked">
                <div class="sub-title">Total Staked</div>
                <div>{{ totalStaked }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tether from '@/assets/svg/tether-logo.svg';
import Dai from '@/assets/svg/dai.svg';
import ImageCombo from '@/components/generics/ImageCombo.vue';

@Component({
    props: ['pool', 'totalStaked', 'APR'],
    components: {
        Tether,
        Dai,
        ImageCombo
    }
})
export default class StakeAsset extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles';

.stake-asset {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
    .title {
        @include DS_Bold;
    }

    .image-combo {
        display: flex;
        justify-content: space-evenly;
        svg {
            height: 30px;
        }

        .combo-one,
        .combo-two {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 50px;
            border-radius: 50px;
        }
        .combo-one {
            background: var(--background-color);
            border: 5px solid var(--background-color);
        }
        .combo-two {
            border: 3px solid var(--button-color);
        }
    }
    .info {
        display: flex;
        border-top: 1px solid var(--bg-color);
        padding-top: 20px;
        justify-content: space-evenly;
        @include DS_Medium;
        font-size: var(--lg-font);
        color: var(--button-color);
        .sub-title {
            color: var(--main-secondary);
            text-transform: uppercase;
            font-size: var(--sm-font);

            @include DS_Light;
            margin-bottom: 10px;
        }
    }
}
</style>
