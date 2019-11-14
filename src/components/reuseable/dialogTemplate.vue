<template>
    <v-dialog v-on="listeners" v-bind="attrs" :max-width="maxWidth">
        <v-card :height="height">
            <template v-if="dialogHeader">
                <v-card-title>{{headerText}}</v-card-title>
                <v-divider v-if="withDivider"></v-divider>
            </template>
            <slot></slot>
            <template v-if="dialogFooter">
                <v-divider v-if="withDivider"></v-divider>
                <v-card-actions class="d-flex justify-end">
                    <v-btn v-if="closeButton" small :color="closeButtonColor" @click="closeDialog">{{closeButtonText}}</v-btn>
                    <v-btn v-if="submitButton" small :color="submitButtonColor" @click="submitDialog" :loading="loadingBtnSubmit">{{submitButtonText}}</v-btn>
                </v-card-actions>
            </template>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'dialogTemplate',
    props: {
        dialogHeader: {
            type: Boolean,
            default: true,
        },
        dialogFooter: {
            type: Boolean,
            default: true,
        },
        closeButton: {
            type: Boolean,
            default: true,
        },
        submitButton: {
            type: Boolean,
            default: true,
        },
        closeButtonText: {
            type: String,
            default: 'Tutup',
        },
        submitButtonText: {
            type: String,
            default: 'Simpan',
        },
        submitButtonColor: {
            type: String,
            default: 'success',
        },
        closeButtonColor: {
            type: String,
            default: 'error',
        },
        headerText: {
            type: String,
            default: 'HeaderText Here',
        },
        maxWidth: {
            type: String,
            default: '800px',
        },
        withDivider: {
            type: Boolean,
            default: true,
        },
        height: {
            type: String,
            default: undefined,
        },
        loadingBtnSubmit: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        listeners() {
            const { closeDialog, submitDialog, ...listeners } = this.$listeners;
            return listeners;
        },
        attrs() {
            const {
                dialogHeader,
                dialogFooter,
                closeButton,
                submitButton,
                closeButtonText,
                submitButtonText,
                headerText,
                maxWidth,
                height,
                withDivider,
                submitButtonColor,
                closeButtonColor,
                loadingBtnSubmit,
                ...attrs
            } = this.$attrs;
            return attrs;
        },
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog');
        },
        submitDialog() {
            this.$emit('submitDialog');
        },
    },
};
</script>
<style lang="scss">
    .v-dialog{
        >.v-card{
            >.v-card__text{
                padding: 15px 24px 20px;
            }
        }
    }
</style>
