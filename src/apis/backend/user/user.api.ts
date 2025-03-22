import {BaseBackendApi} from "@apis/backend/base-backend.api.ts";

export class UserApi extends BaseBackendApi {
    private baseUri = '/user';

    queryActorProfile() {
        return this.request.get(`${this.baseUri}/actor/profile`)
    }

    queryActorUser(){
        return this.request.get(`${this.baseUri}/actor/user`)
    }

    updateActorPassword(data:any){
        return this.request.put(`${this.baseUri}/actor/password`, data)
    }

    updateActorUser(data:any){
        return this.request.put(`${this.baseUri}/actor/user`, data)
    }
}
