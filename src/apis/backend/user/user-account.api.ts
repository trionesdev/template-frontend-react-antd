import {BaseBackendApi} from "@apis/backend/base-backend.api.ts";
import {StorageUtils} from "@trionesdev/browser-commons";

export class UserAccountApi extends BaseBackendApi {
    private baseUri = '/user';

    accountSignIn(data: any) {
        return this.request.post(`${this.baseUri}/sign-in/account`, data).then((res: any) => {
            StorageUtils.setTrionesUserToken(res.token)
        })
    }
}