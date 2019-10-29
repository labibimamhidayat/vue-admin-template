import Vue from 'vue';
import Vuex from 'vuex';
import credentials from './modules/credentitals';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        credentials,
    },
});
