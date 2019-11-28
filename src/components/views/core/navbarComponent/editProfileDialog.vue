<template>
    <dialog-template
        :value="value"
        @input="setValue"
        persistent
        max-width="450px"
        header-text="Edit Profile"
        @closeDialog="setValue(false)"
        @submitDialog="saveProfile"
        :loading-btn-submit="loading"
    >
        <v-card-text>
            <edit-password-dialog v-model="passwordDialog"></edit-password-dialog>
            <validate-group tag="div" ref="validateGroup" class="row">
                <v-col cols="12">
                    <validate ref="name" mode="eager" rules="required|max:99" name="Name" v-slot="{errors}">
                        <input-field
                            label="Name"
                            v-model="profile.name"
                            :error="errors[0]"
                        ></input-field>
                    </validate>
                </v-col>
                <v-col cols="12">
                    <validate ref="email" mode="eager" rules="required|email" name="Email" v-slot="{errors}">
                        <input-field
                            label="Email"
                            v-model="profile.email"
                            :error="errors[0]"
                        ></input-field>
                    </validate>
                </v-col>
                <v-col cols="12">
                    <v-btn color="success" @click="openDialogPassword" small>Change Password</v-btn>
                </v-col>
            </validate-group>
        </v-card-text>
    </dialog-template>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import validatorComponents from '@/mixins/validatorComponents.mixins';
import CredentialsAPI from '@/api/CredentialsAPI';

const dialogTemplate = () => import('@/components/reuseable/dialogTemplate');
const inputField = () => import('@/components/reuseable/inputField');
const editPasswordDialog = () => import('@/components/views/core/navbarComponent/editPasswordDialog');
export default {
    name: 'editProfileDialog',
    components: {
        dialogTemplate,
        inputField,
        editPasswordDialog,
    },
    mixins: [validatorComponents],
    data: () => ({
        profile: {
            name: '',
            email: '',
        },
        passwordDialog: false,
        loading: false,
        credentialsAPI: null,
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
    watch: {
        credits: {
            immediate: true,
            handler(val) {
                if (!Object.keys(val).length) return;
                const { name, email } = val;
                this.profile = {
                    name,
                    email,
                };
            },
        },
    },
    created() {
        this.initApi();
    },
    methods: {
        ...mapActions('credentials', ['setCredits']),
        setValue(value) {
            this.$emit('input', value);
        },
        initApi() {
            this.credentialsAPI = new CredentialsAPI();
        },
        openDialogPassword() {
            this.passwordDialog = true;
        },
        async saveProfile() {
            if (this.loading) return;
            const isValid = await this.$refs.validateGroup.validate();
            if (isValid) {
                try {
                    this.loading = true;
                    const result = await this.credentialsAPI.updateProfile(this.profile);
                    this.afterSuccessSaveProfile(result.data);
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
        afterSuccessSaveProfile(profile) {
            this.$bus.$emit('snackbar', 'success', 'Success Save Profile');
            this.setCredits(profile);
            this.setValue(false);
        },
    },
};
</script>
