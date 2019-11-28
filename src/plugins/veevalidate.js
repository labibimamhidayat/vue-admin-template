// eslint-disable-next-line import/extensions
import id from 'vee-validate/dist/locale/id';
import { localize, extend } from 'vee-validate';
import {
    required,
    min_value as minValue,
    min,
    max,
    email,
} from 'vee-validate/dist/rules';
import { imageHaveError, requiredRichText } from './custom-vee-validate/extendedRules';


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
extend('email', email);
extend('required', required);
extend('min_value', minValue);
extend('min', min);
extend('max', max);
extend('imageHaveError', imageHaveError);
extend('requiredRichText', requiredRichText);
localize('id', id);
localize(dictionary);
