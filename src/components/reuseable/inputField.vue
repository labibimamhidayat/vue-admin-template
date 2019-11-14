<template>
    <v-textarea
        v-if="isTextArea"
        v-on="listeners"
        v-bind="attrs"
        :error-messages="error"
    ></v-textarea>
    <v-text-field
        v-else
        v-on="listeners"
        v-bind="attrs"
        :error-messages="error"
    ></v-text-field>
</template>
<script>
export default {
    name: 'inputField',
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
                textarea,
                ...attrs
            } = this.$attrs;
            return attrs;
        },
        isTextArea() {
            const { textarea } = this.$attrs;
            return textarea !== undefined && textarea !== false;
        },
    },
};
</script>
<style lang="scss">
    .v-text-field {
        padding-top: unset;
        margin-top: unset;
    }
    .v-input__slot{
        margin-bottom: 3px;
    }
    .v-messages , .v-text-field__details{
        min-height: unset;
    }
</style>
