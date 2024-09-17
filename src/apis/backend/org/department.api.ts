import {BackendApi} from "../backend.api.ts";

export class DepartmentApi extends BackendApi{
    private baseUri = '/org';

    createDepartment(data: any) {
        return this.request.post(`${this.baseUri}/departments`, data);
    }

    deleteDepartmentById(id:string){
        return this.request.delete(`${this.baseUri}/departments/${id}`);
    }

    queryDepartmentById(id: string){
        return this.request.get(`${this.baseUri}/departments/${id}`);
    }

    queryDepartmentsTree(params?: any){
        return this.request.get(`${this.baseUri}/departments/tree`,{params});
    }
}