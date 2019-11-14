import { ValidationProvider as validate, ValidationObserver as validateGroup } from 'vee-validate';

const validatorMixins = {
    components: {
        validate,
        validateGroup,
    },
    methods: {
        joinErrors(arrayOfErrors) {
            return arrayOfErrors.reduce((accumulator, currentValue) => (accumulator ? `${accumulator}, ${currentValue}` : currentValue), '');
        },
    },
};

export default validatorMixins;
