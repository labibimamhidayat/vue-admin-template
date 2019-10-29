import CredentialsAPI from '@/api/CredentialsAPI';
import Store from '@/store/store';

const checkCredentialsFromServer = async () => {
    const apiConnection = new CredentialsAPI();
    try {
        const result = await apiConnection.checkToken();
        Store.dispatch('credentials/setCredits', result.data);
        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(error);
    }
};

const checkIfStoreCredentialsExist = () => Object.keys(Store.state.credentials.credits).length;

const GuardsRoute = async () => {
    try {
        if (checkIfStoreCredentialsExist()) {
            return true;
        }
        await checkCredentialsFromServer();
        return true;
    } catch (error) {
        return false;
    }
};

export default GuardsRoute;
