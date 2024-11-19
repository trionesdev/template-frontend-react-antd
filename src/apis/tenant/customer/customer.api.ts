import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class CustomerApi extends BaseTenantApi {
    private baseUri = '/customer';

    create(warehouse: any) {
        return this.request.post(`${this.baseUri}/customers`, warehouse);
    }

    updateById(id: string, warehouse: any) {
        return this.request.put(`${this.baseUri}/customers/${id}`, warehouse);
    }

    queryById(id: string) {
        return this.request.get(`${this.baseUri}/customers/${id}`);
    }

    queryPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/customers/page`, {params});
    }

    queryList(params?: any) {
        return this.request.get(`${this.baseUri}/customers/list`, {params});
    }

    deleteByIds(ids: string[]) {
        return this.request.delete(`${this.baseUri}/customers/${ids.join(",")}`);
    }

}