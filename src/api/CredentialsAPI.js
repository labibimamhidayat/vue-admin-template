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

    updatePassword(password) {
        return this.put(`${this.uri}/password`, password);
    }

    updateProfile(profile) {
        return this.put(`${this.uri}/profile`, profile);
    }
}

export default Credentials;
