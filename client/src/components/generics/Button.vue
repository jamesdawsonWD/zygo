<template>
    <button class="button" :class="buttonStyle" @click="submit">
        <h2>{{ title }}</h2>
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
    margin: 25px 5px;
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
