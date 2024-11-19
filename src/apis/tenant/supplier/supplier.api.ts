import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class SupplierApi extends BaseTenantApi {
    private baseUri = '/supplier';

    create(entity: any) {
        return this.request.post(`${this.baseUri}/suppliers`, entity);
    }

    updateById(id: string, entity: any) {
        return this.request.put(`${this.baseUri}/suppliers/${id}`, entity);
    }

    queryById(id: string) {
        return this.request.get(`${this.baseUri}/suppliers/${id}`);
    }

    queryPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/suppliers/page`, {params});
    }

    queryList(params?: any) {
        return this.request.get(`${this.baseUri}/suppliers/list`, {params});
    }

    deleteByIds(ids: string[]) {
        return this.request.delete(`${this.baseUri}/suppliers/${ids.join(",")}`);
    }

}