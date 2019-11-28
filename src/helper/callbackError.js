import eventBus from '@/plugins/eventBus';

const defaultFunction = () => {};
const callbackError = (error, callbackObject = {}) => {
    if (error.response && error.response.status === 500) {
        // eslint-disable-next-line no-unused-expressions
        callbackObject.internalServerError ? callbackObject.internalServerError() : eventBus.$emit('snackbar', 'error', 'Terjadi Kesalahan Pada Server, Silahkan Ulangi Kembali Beberapa Saat');
    } else if (error.response && (error.response.status === 400 || error.response.status === 422)) {
        // eslint-disable-next-line no-unused-expressions
        callbackObject.badRequest() || defaultFunction();
    }
    // eslint-disable-next-line no-unused-expressions
    callbackObject.default ? callbackObject.default() : defaultFunction();
};
export default callbackError;
