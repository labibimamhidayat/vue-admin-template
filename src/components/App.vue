<template>
  <div id="app">
      <v-app>
        <snack-bar></snack-bar>
        <router-view/>
      </v-app>
  </div>
</template>
<script>
const snackBar = () => import('@/components/reuseable/snackBar');
export default {
    name: 'App',
    components: {
        snackBar,
    },
};
</script>
<style>
  @font-face {
      font-family: Lato;
      src: url("../assets/font/lato-light.ttf") format('truetype');
  }
  #app .v-application {
    font-family: Lato;
  }
</style>
