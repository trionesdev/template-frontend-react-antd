import {BackendApi} from "../backend.api.ts";
import {PageQueryParams} from "@apis";


export class TenantApi extends BackendApi {
    private baseUri = '/org';

    createTenantMember(data: any) {
        return this.request.post(this.baseUri + '/tenant/members', data);
    }

    updateTenantMemberById(id: string, data: any) {
        return this.request.put(this.baseUri + '/tenant/members/' + id, data);
    }

    queryTenantMemberById(id: string) {
        return this.request.get(this.baseUri + '/tenant/members/' + id);
    }

    queryTenantMembersPage(params: PageQueryParams) {
        return this.request.get(this.baseUri + '/tenant/member/page', {params});
    }

    queryActorMember(){
        return this.request.get(this.baseUri + '/tenant/member/actor');
    }

}