<template>
    <dialog-template
        :value="value"
        @input="setValue"
        persistent
        max-width="400px"
        header-text="Edit Password"
        @closeDialog="setValue(false)"
        @submitDialog="savePassword"
        :loading-btn-submit="loading"
    >
        <v-card-text>
            <validate-group tag="div" ref="validateGroup" class="row">
                <v-col cols="12">
                    <validate ref="old_password" mode="eager" rules="required" name="Old Password" v-slot="{errors}">
                        <input-field
                            label="Old Password"
                            v-model="password.old_password"
                            :error="errors[0]"
                            type="password"
                        ></input-field>
                    </validate>
                </v-col>
                <v-col cols="12">
                    <validate ref="new_password" mode="eager" rules="required" name="New Password" v-slot="{errors}">
                        <input-field
                            label="New Password"
                            v-model="password.new_password"
                            :error="errors[0]"
                            type="password"
                        ></input-field>
                    </validate>
                </v-col>
            </validate-group>
        </v-card-text>
    </dialog-template>
</template>
<script>
import { mapState } from 'vuex';
import validatorComponents from '@/mixins/validatorComponents.mixins';
import CredentialsAPI from '@/api/CredentialsAPI';
import { setTokenToLocalStorage } from '@/helper/saveToken';

const dialogTemplate = () => import('@/components/reuseable/dialogTemplate');
const inputField = () => import('@/components/reuseable/inputField');
export default {
    name: 'editPasswordDialog',
    components: {
        dialogTemplate,
        inputField,
    },
    mixins: [validatorComponents],
    data: () => ({
        password: {
            old_password: '',
            new_password: '',
        },
        credentialsAPI: null,
        loading: false,
    }),
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('credentials', ['credits']),
    },
    created() {
        this.initApi();
    },
    methods: {
        setValue(value) {
            this.$emit('input', value);
        },
        initApi() {
            this.credentialsAPI = new CredentialsAPI();
        },
        async savePassword() {
            if (this.loading) return;
            const isValid = await this.$refs.validateGroup.validate();
            if (isValid) {
                try {
                    this.loading = true;
                    const result = await this.credentialsAPI.updatePassword(this.password);
                    this.afterSuccessSavePassword(result.data);
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
        afterSuccessSavePassword(token) {
            setTokenToLocalStorage(token);
            this.$bus.$emit('snackbar', 'success', 'Success Change Password');
            window.location.reload();
        },
    },
};
</script>
