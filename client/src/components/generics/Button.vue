<template>
    <button class="button" :class="buttonStyle" @click="submit">
        <h3>{{ title }}</h3>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: ['title', 'buttonStyle'],
    methods: {
        submit: function() {
            this.$emit('clicked');
        }
    }
};
</script>

<style scoped lang="scss">
.button {
    max-width: 300px;
    border: none;
    padding: 15px;
    border-radius: 15px;
    background: var(--pink-gradient);
    &:hover {
        background: var(--pink-gradient);
        cursor: pointer;
    }
}
</style>
