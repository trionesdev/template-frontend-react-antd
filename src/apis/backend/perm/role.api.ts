import {BackendApi} from "@apis/backend/backend.api.ts";
import {PageQueryParams} from "@apis";

export class RoleApi extends BackendApi {
    private baseUri = '/perm';

    createRole(role: any) {
        return this.request.post(`${this.baseUri}/roles`, role);
    }

    deleteRoleById(roleId: string) {
        return this.request.delete(`${this.baseUri}/roles/${roleId}`);
    }

    updateRoleById(id: string, role: any) {
        return this.request.put(`${this.baseUri}/roles/${id}`, role);
    }

    queryRoleById(id: string) {
        return this.request.get(`${this.baseUri}/roles/${id}`);
    }

    queryRoleTree() {
        return this.request.get(`${this.baseUri}/role/tree`);
    }

    grantRole(roleId: string, data: { grantObjType: string, grantObjIds: string[] }) {
        return this.request.put(`${this.baseUri}/roles/${roleId}/grant`, data);
    }

    removeRoleGrantsBatch(roleId: string, data: { grantObjType: string, grantObjIds: string[] }) {
        return this.request.put(`${this.baseUri}/roles/${roleId}/grants/remove/batch`, data);
    }

    queryRoleMemberPage(id: string, params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/roles/${id}/member/page`, {params});
    }

}