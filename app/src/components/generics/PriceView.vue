<template>
    <div class="priceView">
        <div class="title">
            {{ asset }}
        </div>
        <div class="price">
            {{ price }}
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    props: ['price', 'asset']
})
export default class PriceView extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles';

.priceView {
    display: flex;
    flex-direction: column;
    .title {
        text-align: left;
        @include DS_Bold;
    }
    .price {
        text-align: left;
        margin-top: 20px;
        @include DS_Bold;
        font-size: var(--lg-font);
        color: var(--button-color);
    }
}
</style>
