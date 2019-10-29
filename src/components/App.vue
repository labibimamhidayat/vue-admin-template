<template>
  <div id="app">
      <v-app>
        <router-view/>
      </v-app>
  </div>
</template>
<style>
  @font-face {
      font-family: Nokio;
      src: url("../assets/font/nokio/nokio.otf") format("opentype");
  }
  #app .v-application {
    font-family: Nokio;
  }
</style>
