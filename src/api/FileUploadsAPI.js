import Axios from '@/plugins/axios';

class FileUploads extends Axios {
    constructor(header) {
        super(header);
        this.uri = '/upload';
    }

    uploadFiles(prefix, data) {
        return this.post(`${this.uri}/${prefix}`, data);
    }

    deleteFiles(data) {
        return this.delete(`${this.uri}`, data);
    }
}

export default FileUploads;
