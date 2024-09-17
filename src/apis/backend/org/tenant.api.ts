import {BackendApi} from "../backend.api.ts";
import {PageQueryParams} from "../../types.ts";


export class TenantApi extends BackendApi {
    private baseUri = '/tenant';

    createTenantMember(data: any) {
        return this.request.post(this.baseUri + '/members', data);
    }

    updateTenantMemberById(id: string, data: any) {
        return this.request.put(this.baseUri + '/members/' + id, data);
    }

    queryTenantMemberById(id: string) {
        return this.request.get(this.baseUri + '/members/' + id);
    }

    queryTenantMembersPage(params: PageQueryParams) {
        return this.request.get(this.baseUri + '/members/page', {params});
    }

}