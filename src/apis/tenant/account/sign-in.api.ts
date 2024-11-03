import {StorageUtils} from "@trionesdev/browser-commons";
import {BaseTenantApi} from "../base-tenant.api.ts";

export class SignInApi extends BaseTenantApi {
    private baseUri = '/account';

    accountSignIn(data: any) {
        return this.request.post(`${this.baseUri}/sign-in/account`, data).then((res: any) => {
            StorageUtils.setTrionesUserToken(res.token)
        });
    }

}