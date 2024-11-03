import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {ClientType, PermissionSubjectType} from "@app/boss/perm/internal/perm.enums.ts";


export class PolicyApi extends BaseTenantApi {
    private baseUri = '/perm';

    savePolicy(data: {
        appCode?: string,
        clientType?: ClientType,
        subjectType: PermissionSubjectType,
        subject: string,
        permissions?: { obj?: string, effect?: string }[]
    }) {
        return this.request.put(`${this.baseUri}/policy/save`, data)
    }

    queryPermissionsBySubject(params: { subjectType: string, subject: string }) {
        return this.request.get(`${this.baseUri}/policy/permissions`, {params})
    }

}