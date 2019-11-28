<template>
     <v-app-bar
      color="primary"
      dark
      app
    >
      <v-app-bar-nav-icon @click="changeDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <profile-menu></profile-menu>
    </v-app-bar>
</template>
<script>
import { mapState } from 'vuex';

const profileMenu = () => import('@/components/views/core/navbarComponent/profileMenu');
export default {
    name: 'navBar',
    components: {
        profileMenu,
    },
    data: () => ({
        drawer: true,
    }),
    computed: {
        ...mapState('credentials', ['credits']),
    },
    methods: {
        changeDrawer() {
            this.drawer = !this.drawer;
            this.$bus.$emit('navDrawer', this.drawer);
        },
    },
};
</script>
