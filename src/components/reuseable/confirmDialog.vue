<template>
    <dialog-template
        :value="value"
        @input="setValue"
        :with-divider="false"
        max-width="400"
        :submit-button-color="confirmAttributes.submitButtonColor"
        :close-button-color="confirmAttributes.closeButtonColor"
        :close-button-text="confirmAttributes.closeButtonText"
        :submit-button-text="confirmAttributes.submitButtonText"
        :loading-btn-submit="loading"
        :header-text="confirm.title"
        persistent
        @submitDialog="submitCallback"
        @closeDialog="closeDialog"
    >
        <v-card-text>
            {{confirm.body}}
        </v-card-text>
    </dialog-template>
</template>
<script>

const dialogTemplate = () => import('@/components/reuseable/dialogTemplate');
export default {
    name: 'confirmDialog',
    components: {
        dialogTemplate,
    },
    data: () => ({
        loading: false,
    }),
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        typeConfirm: {
            type: String,
            default: '',
        },
        callBackSubmit: {
            type: Function,
            default: () => {},
        },
        confirm: {
            type: Object,
            default: () => ({
                title: '',
                body: '',
            }),
        },
    },
    computed: {
        confirmAttributes() {
            if (this.typeConfirm === 'delete') {
                return {
                    closeButtonText: 'Batal',
                    submitButtonText: 'Hapus',
                    closeButtonColor: 'success',
                    submitButtonColor: 'error',
                    callbackSuccessText: 'Hapus Berhasil',
                };
            }
            return {

            };
        },
    },
    methods: {
        setValue(value) {
            this.$emit('input', value);
        },
        reFetch() {
            this.$emit('reFetch');
        },
        async submitCallback() {
            if (this.loading) return;
            try {
                this.loading = true;
                await this.callBackSubmit();
                this.afterSuccess();
            } catch (error) {
                this.$error(error, {
                    default() {
                        console.log('ini error', error);
                    },
                });
            } finally {
                this.loading = false;
            }
        },
        closeDialog() {
            this.setValue(false);
        },
        afterSuccess() {
            this.$bus.$emit('snackbar', 'success', this.confirmAttributes.callbackSuccessText, 2000);
            this.setValue(false);
            this.reFetch();
        },
    },
};
</script>
