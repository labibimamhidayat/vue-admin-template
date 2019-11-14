import Axios from '@/plugins/axios';
import queryUrlHelper from '@/helper/queryUrlHelper';

class Products extends Axios {
    constructor(header) {
        super(header);
        this.uri = '/category';
    }

    getProducts(queryObject = {}) {
        return this.get(`${this.uri}${queryUrlHelper(queryObject)}`);
    }

    saveProducts(data) {
        return this.post(`${this.uri}`, data);
    }

    updateProducts(id, data) {
        return this.put(`${this.uri}/${id}`, data);
    }

    deleteProducts(id) {
        return this.delete(`${this.uri}/${id}`);
    }
}

export default Products;
