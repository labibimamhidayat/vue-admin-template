<template>
    <v-select
        v-on="listeners"
        v-bind="attrs"
        :error-messages="error"
    ></v-select>
</template>
<script>
export default {
    name: 'selectInput',
    props: {
        error: {
            type: String,
            default: '',
        },
    },
    computed: {
        listeners() {
            const { ...listeners } = this.$listeners;
            return listeners;
        },
        attrs() {
            const {
                error,
                ...attrs
            } = this.$attrs;
            return attrs;
        },
    },
};
</script>
