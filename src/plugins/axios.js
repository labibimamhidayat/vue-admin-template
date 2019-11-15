import AxiosREST from 'axios';

class ConfigAxios {
    constructor(options = {}) {
        this.Axios = AxiosREST.create({
            baseURL: process.env.VUE_APP_ROOT_API,
            headers: {
                AuthToken: localStorage.getItem('token'),
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            ...options,
        });
    }

    async getData(method, url, data, options = {}) {
        try {
            let result = null;
            if (method === 'post') {
                result = await this.Axios.post(url, data, options);
            } else if (method === 'get') {
                result = await this.Axios.get(url, data, options);
            } else if (method === 'put') {
                result = await this.Axios.put(url, data, options);
            } else if (method === 'patch') {
                result = await this.Axios.patch(url, data, options);
            } else if (method === 'delete') {
                result = await this.Axios.delete(url, { data }, options);
            } else {
                // eslint-disable-next-line no-throw-literal
                throw ('method not found');
            }
            return result;
        } catch (error) {
            const errorResponse = error.response;
            if (errorResponse.status && errorResponse.status === 401) {
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            } else if (errorResponse.status && errorResponse.status > 500) {
                // eslint-disable-next-line no-alert
                alert('Terjadi Kesalahan Pada Server');
            }
            return Promise.reject(error);
        }
    }

    post(url, data, options) {
        return this.getData('post', url, data, options);
    }

    get(url, data, options) {
        return this.getData('get', url, data, options);
    }

    put(url, data, options) {
        return this.getData('put', url, data, options);
    }

    delete(url, data, options) {
        return this.getData('delete', url, data, options);
    }
}

export default ConfigAxios;
