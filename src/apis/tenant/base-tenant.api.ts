import {StorageUtils} from "@trionesdev/browser-commons"
import {BaseTrionesApi} from "@trionesdev/commons"

export class BaseTenantApi extends BaseTrionesApi{

    constructor() {
        super({
            baseURL: `/tenant-api`,
            beforeRequest: (request: any) => {
                const token = StorageUtils.getTrionesUserToken();
                if (token) {
                    request.headers["Authorization"] = "Bearer " + token;
                }
            },
            onUnauthorized: () => {
                window.location.href = "/#/sign-in";
            }
        });
    }
}