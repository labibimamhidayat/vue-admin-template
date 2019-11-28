import Axios from '@/plugins/axios';
import queryUrlHelper from '@/helper/queryUrlHelper';

class Email extends Axios {
    constructor(header) {
        super(header);
        this.uri = '/email';
    }

    getListOfEmails(queryObject = {}) {
        return this.get(`${this.uri}${queryUrlHelper(queryObject)}`);
    }

    getEmailsReceiver() {
        return this.get(`${this.uri}/receiver`);
    }

    setEmailReceiver(email) {
        return this.post(`${this.uri}/receiver`, email);
    }

    deleteFiles(data) {
        return this.delete(`${this.uri}`, data);
    }
}

export default Email;
