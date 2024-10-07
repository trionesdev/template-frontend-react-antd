import {BackendApi} from "@apis/backend/backend.api.ts";

export class OssApi extends BackendApi {
    private baseUri = '/oss';

    formDataUpload(data: FormData) {
        return this.request.post(`${this.baseUri}/upload/form-data`, data, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    }

}