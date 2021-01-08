<template>
    <div class="form-row">
        <label>{{ label }}</label>
        <span class="currency">{{ currency }}</span>
        <input
            :id="inputId"
            @input="$emit('update:model', $event)"
            :placeholder="placeHolder"
            :value="model"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Button from '@/components/generics/Button.vue';

@Component({
    components: {
        Button
    },
    data() {
        return {
            deployed: false
        };
    },
    computed: {
        ...mapGetters(['PLANET_getTokenIdToProxy'])
    },
    props: ['tokenId', 'label', 'inputId', 'placeHolder', 'currency', 'model']
})
export default class StandardInput extends Vue {
    @Prop() private amount!: number;
}
</script>
<style scoped lang="scss">
@import '@/styles';

.currency {
    position: absolute;
    font-size: var(--md-font);
    color: var(--main-font);
    right: 25px;
    bottom: 0;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    @include DS_Bold;
}
</style>
