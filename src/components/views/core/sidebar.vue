<template>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{titleSidebar}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
       <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>
<script>
import CredentialsAPI from '@/api/CredentialsAPI';

export default {
    name: 'sideBar',
    data: () => ({
        CredentialsAPI: null,
        titleSidebar: 'Visicom Admin Panel',
        drawer: true,
        items: [
            { title: 'Home', icon: 'fas fa-home' },
            { title: 'Product', icon: 'fas fa-boxes' },
            { title: 'Partners', icon: 'fas fa-handshake' },
            { title: 'Clients', icon: 'fas fa-building' },
            { title: 'Emails', icon: 'fas fa-envelope' },
            { title: 'Admin', icon: 'fas fa-user-shield' },
        ],
    }),
    mounted() {
        this.listenNavDrawer();
        this.initAPI();
    },
    methods: {
        initAPI() {
            this.CredentialsAPI = new CredentialsAPI();
        },
        listenNavDrawer() {
            this.$bus.$on('navDrawer', this.changeDrawer);
        },
        changeDrawer(state) {
            this.drawer = state;
        },
        async logout() {
            try {
                await this.CredentialsAPI.userLogout();
                this.clearLocalStorage();
                this.pushToLogin();
            } catch (error) {
                // eslint-disable-next-line no-alert
                alert('Terjadi Kesalahan Silahkan Ulangi Kembali');
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
