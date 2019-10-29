import Axios from '@/plugins/axios';

class Credentials extends Axios {
    constructor(header) {
        super(header);
        this.uri = '/auth';
    }

    userLogin(data) {
        return this.post(`${this.uri}/login`, data);
    }

    checkToken() {
        return this.get(`${this.uri}/me`);
    }

    userLogout() {
        return this.get(`${this.uri}/logout`);
    }
}

export default Credentials;
