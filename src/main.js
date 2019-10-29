import Vue from 'vue';
import App from '@/components/App.vue';
import router from '@/router/router';
import store from '@/store/store';
import vuetify from '@/plugins/vuetify';
import eventBus from '@/plugins/eventBus';
import '@/plugins/veevalidate';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.prototype.$baseURL = process.env.VUE_APP_ROOT_API;
Vue.prototype.$bus = eventBus;

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
}).$mount('#app');
