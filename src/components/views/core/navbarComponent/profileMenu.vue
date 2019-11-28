<template>
    <drop-down-menu
      transition="slide-y-transition"
      bottom
      offset-y
      :close-on-content-click="false"
    >
        <template v-slot:activator="{ on }">
            <v-avatar class="pointer" v-on="on" color="white">
                <span class="black--text">{{getInitialsName}}</span>
            </v-avatar>
        </template>
        <v-card>
            <edit-profile-dialog v-model="editDialogState"></edit-profile-dialog>
            <v-list dense>
                <v-subheader>Welcome, {{credits.name}}</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item class="d-flex align-center" @click="openEditProfileDialog">
                        <span style="width:20px;"><v-icon small>fas fa-user-edit</v-icon></span>
                        <v-list-item-content class="ml-3">
                            <v-list-item-title>Change Profile</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="d-flex align-center" @click.stop.prevent="logout()">
                        <span style="width:20px;"><v-icon small>fas fa-sign-out-alt</v-icon></span>
                        <v-list-item-content class="ml-3">
                            <v-list-item-title>Log Out</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </drop-down-menu>
</template>
<script>
import { mapState } from 'vuex';
import CredentialsAPI from '@/api/CredentialsAPI';

const dropDownMenu = () => import('@/components/reuseable/dropDownMenu');
const editProfileDialog = () => import('@/components/views/core/navbarComponent/editProfileDialog');
export default {
    name: 'profileMenu',
    components: {
        dropDownMenu,
        editProfileDialog,
    },
    data: () => ({
        editDialogState: false,
        credentialsAPI: null,
    }),
    computed: {
        ...mapState('credentials', ['credits']),
        getInitialsName() {
            return this.credits.name.split(' ').map(eachName => eachName.charAt(0).toUpperCase()).join('');
        },
    },
    mounted() {
        this.initApi();
    },
    methods: {
        initApi() {
            this.credentialsAPI = new CredentialsAPI();
        },
        openEditProfileDialog() {
            this.editDialogState = !this.editDialogState;
        },
        async logout() {
            try {
                await this.credentialsAPI.userLogout();
                this.clearLocalStorage();
                this.pushToLogin();
            } catch (error) {
                console.log('ini errror', error);
            }
        },
        clearLocalStorage() {
            localStorage.clear();
        },
        pushToLogin() {
            window.location.href = '/login';
        },
    },
};
</script>
