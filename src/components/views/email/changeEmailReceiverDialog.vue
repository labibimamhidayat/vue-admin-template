<template>
    <dialog-template
        :value="value"
        @input="setValue"
        persistent
        max-width="450px"
        header-text="Change Email Receiver"
        @closeDialog="setValue(false)"
        @submitDialog="saveChangeEmailReceiver"
        :loading-btn-submit="loading"
    >
        <v-card-text>
            <validate-group tag="div" ref="validateGroup" class="row">
                <v-col cols="12">
                    <validate ref="name" mode="eager" rules="required|max:99" name="Name" v-slot="{errors}">
                        <input-field
                            label="Name"
                            v-model="emailReceiver.name"
                            :error="errors[0]"
                        ></input-field>
                    </validate>
                </v-col>
                <v-col cols="12">
                    <validate ref="email" mode="eager" rules="required|email" name="Email" v-slot="{errors}">
                        <input-field
                            label="Email"
                            v-model="emailReceiver.email"
                            :error="errors[0]"
                        ></input-field>
                    </validate>
                </v-col>
            </validate-group>
        </v-card-text>
    </dialog-template>
</template>
<script>
import validatorComponents from '@/mixins/validatorComponents.mixins';
import EmailAPI from '@/api/EmailAPI';

const dialogTemplate = () => import('@/components/reuseable/dialogTemplate');
const inputField = () => import('@/components/reuseable/inputField');
export default {
    name: 'changeEmailReceiverDialog',
    components: {
        dialogTemplate,
        inputField,
    },
    mixins: [validatorComponents],
    data: () => ({
        emailReceiver: {
            name: '',
            email: '',
        },
        loading: false,
        emailAPI: null,
    }),
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        this.initApi();
    },
    mounted() {
        this.getEmailReceiver();
    },
    methods: {
        setValue(value) {
            this.$emit('input', value);
        },
        initApi() {
            this.emailAPI = new EmailAPI();
        },
        async getEmailReceiver() {
            try {
                const result = await this.emailAPI.getEmailsReceiver();
                const { name, email } = result.data;
                this.emailReceiver = {
                    name,
                    email,
                };
            } catch (error) {
                console.log('ini error', error);
            }
        },
        async saveChangeEmailReceiver() {
            if (this.loading) return;
            const isValid = await this.$refs.validateGroup.validate();
            if (isValid) {
                try {
                    this.loading = true;
                    await this.emailAPI.setEmailReceiver(this.emailReceiver);
                    this.afterSuccessSaveChangeEmailReceiver();
                } catch (error) {
                    const badRequest = () => {
                        const errorBag = error.response.data.errors;
                        Object.keys(errorBag).forEach((eachKey) => {
                            this.$refs[eachKey].setErrors(errorBag[eachKey]);
                        });
                    };
                    badRequest.bind(this);
                    this.$error(error, {
                        badRequest,
                        default() {
                            console.log('ini error default', error);
                        },
                    });
                } finally {
                    this.loading = false;
                }
            }
        },
        afterSuccessSaveChangeEmailReceiver() {
            this.$bus.$emit('snackbar', 'success', 'Success Change Email Receiver');
            this.setValue(false);
        },
    },
};
</script>
