import {BackendApi} from "@apis/backend/backend.api.ts";
import {StorageUtils} from "@trionesdev/browser-commons";

export class TenantAccountApi extends BackendApi {
    private baseUri = '/org';

    accountSignIn(data: any) {
        return this.request.post(`${this.baseUri}/sign-in/account`, data).then((res: any) => {
            StorageUtils.setTrionesUserToken(res.token)
        })
    }
}