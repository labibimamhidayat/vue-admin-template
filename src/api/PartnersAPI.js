import Axios from '@/plugins/axios';
import queryUrlHelper from '@/helper/queryUrlHelper';

class Partners extends Axios {
    constructor(header) {
        super(header);
        this.uri = '/vendor';
    }

    getPartners(queryObject = {}) {
        return this.get(`${this.uri}${queryUrlHelper(queryObject)}`);
    }

    savePartners(data) {
        return this.post(`${this.uri}`, data);
    }

    updatePartners(id, data) {
        return this.put(`${this.uri}/${id}`, data);
    }

    deletePartners(id) {
        return this.delete(`${this.uri}/${id}`);
    }
}

export default Partners;
