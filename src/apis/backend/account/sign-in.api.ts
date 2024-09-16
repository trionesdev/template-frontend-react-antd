import {StorageUtils} from "@trionesdev/browser-commons";
import {BackendApi} from "../backend.api.ts";

export class SignInApi extends BackendApi {
    private baseUri = '/account';

    accountSignIn(data: any) {
        return this.request.post(`${this.baseUri}/sign-in/account`, data).then((res: any) => {
            StorageUtils.setTrionesUserToken(res.token)
        });
    }

}