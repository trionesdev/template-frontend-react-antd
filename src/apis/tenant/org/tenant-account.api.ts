import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {StorageUtils} from "@trionesdev/browser-commons";

export class TenantAccountApi extends BaseTenantApi {
    private baseUri = '/org';

    accountSignIn(data: any) {
        return this.request.post(`${this.baseUri}/sign-in/account`, data).then((res: any) => {
            StorageUtils.setTrionesUserToken(res.token)
        })
    }
}