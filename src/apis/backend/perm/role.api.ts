import {BackendApi} from "@apis/backend/backend.api.ts";

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

    queryRoleTree() {
        return this.request.get(`${this.baseUri}/role/tree`);
    }

}