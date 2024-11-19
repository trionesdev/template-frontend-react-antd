import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class CustomerApi extends BaseTenantApi {
    private baseUri = '/customer';

    create(entity: any) {
        return this.request.post(`${this.baseUri}/customers`, entity);
    }

    updateById(id: string, entity: any) {
        return this.request.put(`${this.baseUri}/customers/${id}`, entity);
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