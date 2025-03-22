import {BaseTenantApi} from "../base-tenant.api.ts";
import {PageQueryParams} from "@apis";


export class TenantApi extends BaseTenantApi {
    private baseUri = '/org';

    createTenant(data: any) {
        return this.request.post(this.baseUri + '/tenants', data)
    }

    queryActorTenant() {
        return this.request.get(this.baseUri + '/actor/tenant')
    }

    updateActorTenant(data: any) {
        return this.request.put(this.baseUri + '/actor/tenant', data)
    }


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

    findActorProfile() {
        return this.request.get(this.baseUri + '/tenant/actor/profile');
    }

    queryActorMember() {
        return this.request.get(this.baseUri + '/tenant/actor/member');
    }

    updateActorMember(data: any) {
        return this.request.put(this.baseUri + '/tenant/actor/member', data);
    }

    changeActorPassword(data: any) {
        return this.request.put(this.baseUri + '/tenant/actor/password', data);
    }

    changePassword(data: any) {
        return this.request.put(this.baseUri + '/tenant/member/password', data);
    }

    queryOrgList(params: any) {
        return this.request.get(this.baseUri + '/tenant/org/list', {params});
    }

}
