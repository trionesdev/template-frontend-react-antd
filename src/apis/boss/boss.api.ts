import {StorageUtils} from "@trionesdev/browser-commons"
import {BaseTrionesApi} from "@trionesdev/commons"

export class BackendApi  extends BaseTrionesApi{

    constructor() {
        super({
            baseURL: `/boss-api`,
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