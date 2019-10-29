import Vue from 'vue';
// eslint-disable-next-line import/extensions
import id from 'vee-validate/dist/locale/id';
import { ValidationProvider, localize } from 'vee-validate';

// config here
// ubah pesan perfield disini :)
const dictionary = {
    id: {
        messages: {
            email: attr => `${attr} tidak valid`,
            confirmed: () => 'Password tidak cocok',
        },
    },
};
localize('id', id);
localize(dictionary);

Vue.component('validate', ValidationProvider);


export default ValidationProvider;
