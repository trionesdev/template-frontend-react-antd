import {BaseTrionesApi} from "@trionesdev/commons";
import {StorageUtils} from "@trionesdev/browser-commons";

export class BaseBackendApi extends BaseTrionesApi {

    constructor() {
        super({
            baseURL: `/api`,
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