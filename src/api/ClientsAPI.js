import Axios from '@/plugins/axios';
import queryUrlHelper from '@/helper/queryUrlHelper';

class Clients extends Axios {
    constructor(header) {
        super(header);
        this.uri = '/client';
    }

    getClients(queryObject = {}) {
        return this.get(`${this.uri}${queryUrlHelper(queryObject)}`);
    }

    saveClients(data) {
        return this.post(`${this.uri}`, data);
    }

    updateClients(id, data) {
        return this.put(`${this.uri}/${id}`, data);
    }

    deleteClients(id) {
        return this.delete(`${this.uri}/${id}`);
    }
}

export default Clients;
