import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";

export class OssApi extends BaseTenantApi {
    private baseUri = '/oss';

    formDataUpload(data: FormData) {
        return this.request.post(`${this.baseUri}/upload/form-data`, data, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
    }

}