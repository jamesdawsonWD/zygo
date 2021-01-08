<template>
    <div class="image-combo">
        <div class="combo-one">
            <Dai v-if="firstCombo == 'DAI'" />
        </div>
        <div class="combo-two">
            <Tether v-if="secondCombo == 'TETHER'" />
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tether from '@/assets/svg/tether-logo.svg';
import Dai from '@/assets/svg/dai.svg';

@Component({
    props: ['firstCombo', 'secondCombo'],
    components: {
        Tether,
        Dai
    }
})
export default class StakeAsset extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
