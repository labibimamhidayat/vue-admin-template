<template>
    <v-navigation-drawer v-model="drawer" class="sidebar-admin" app>
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
        <template v-for="item in items">
          <v-list-item
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
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
            { title: 'Home', icon: 'fas fa-home', to: '/' },
            { title: 'Products', icon: 'fas fa-boxes', to: '/products' },
            { title: 'Partners', icon: 'fas fa-handshake', to: '/partners' },
            { title: 'Clients', icon: 'fas fa-building', to: '/clients' },
            { title: 'Emails', icon: 'fas fa-envelope', to: '/emails' },
            // { title: 'Admin', icon: 'fas fa-user-shield' },
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
    },
};
</script>
<style>
  .sidebar-admin .v-list .v-list-item .v-list-item__icon {
    margin-right: unset;
    flex-basis: 20%;
  }
  .sidebar-admin .v-list .v-list-item{
    display: flex;
  }
</style>
