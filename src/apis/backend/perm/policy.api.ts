import {BackendApi} from "@apis/backend/backend.api.ts";
import {ClientType, PermissionSubjectType} from "@app/boss/perm/internal/perm.enums.ts";


export class PolicyApi extends BackendApi {
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