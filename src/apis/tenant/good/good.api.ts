import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class GoodApi extends BaseTenantApi {
    private baseUri = '/good';

    create(entity: any) {
        return this.request.post(`${this.baseUri}/goods`, entity);
    }

    updateById(id: string, entity: any) {
        return this.request.put(`${this.baseUri}/goods/${id}`, entity);
    }

    queryById(id: string) {
        return this.request.get(`${this.baseUri}/goods/${id}`);
    }

    queryPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/goods/page`, {params});
    }

    queryList(params?: any) {
        return this.request.get(`${this.baseUri}/goods/list`, {params});
    }

    deleteByIds(ids: string[]) {
        return this.request.delete(`${this.baseUri}/goods/${ids.join(",")}`);
    }

}