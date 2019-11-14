<template>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      :top="'top'"
    >
      <span class="font-weight-black">{{text}}</span>
      <v-btn
        dark
        @click="snackbar = false"
        icon
      >
        <v-icon>fas fa-times</v-icon>
      </v-btn>
    </v-snackbar>
</template>
<script>
export default {
    name: 'snackBar',
    data: () => ({
        snackbar: false,
        timeout: 3000,
        color: '',
        text: '',
    }),
    created() {
        this.listenSnackbar();
    },
    methods: {
        listenSnackbar() {
            this.$bus.$on('snackbar', this.openSnackbar);
        },
        openSnackbar(event, text, timeout = 3000) {
            this.color = event;
            this.text = text;
            this.timeout = timeout;
            this.snackbar = true;
        },
    },
};
</script>
