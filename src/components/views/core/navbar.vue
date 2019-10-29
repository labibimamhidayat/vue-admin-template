<template>
     <v-app-bar
      color="deep-purple accent-4"
      dark
      app
    >
      <v-app-bar-nav-icon @click="changeDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Welcome {{credits.name}}</v-toolbar-title>
    </v-app-bar>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'navBar',
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
