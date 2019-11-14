import sanitizeHTML from '@/helper/sanitizeHTML';

const objectRequired = {
    computesRequired: true,
    validate: value => ({
        valid: Object.keys(value).length,
        required: true,
    }),
    message: '{_field_} tidak boleh kosong',
};

const requiredRichText = {
    computesRequired: true,
    validate: html => ({
        valid: sanitizeHTML(html).length,
        required: true,
    }),
    message: '{_field_} tidak boleh kosong',
};

const imageHaveError = {
    validate: value => !value.some(eachData => eachData.errorMessage),
    message: 'Terdapat kesalahan pada {_field_}',
};

export {
    objectRequired,
    imageHaveError,
    requiredRichText,
};
