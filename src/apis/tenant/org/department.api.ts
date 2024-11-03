import {BaseTenantApi} from "../base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class DepartmentApi extends BaseTenantApi {
    private baseUri = '/org';

    createDepartment(data: any) {
        return this.request.post(`${this.baseUri}/departments`, data);
    }

    deleteDepartmentById(id: string) {
        return this.request.delete(`${this.baseUri}/departments/${id}`);
    }

    updateDepartmentById(id:string,data: any) {
        return this.request.put(`${this.baseUri}/departments/${id}`, data);
    }

    queryDepartmentById(id: string) {
        return this.request.get(`${this.baseUri}/departments/${id}`);
    }

    queryDepartmentsTree(params?: any) {
        return this.request.get(`${this.baseUri}/department/tree`, {params});
    }

    deleteDepartmentMemberById(id:string) {
        return this.request.delete(`${this.baseUri}/department/members/${id}`);
    }

    queryDepartmentMemberPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/department/member/page`, {params});
    }

    queryDepartmentPaths(departmentId: string) {
        return this.request.get(`${this.baseUri}/departments/${departmentId}/paths`);
    }


    queryDepartmentOrgNodeList(params: { departmentId: string }) {
        return this.request.get(`${this.baseUri}/department/org/list`, {params});
    }
}