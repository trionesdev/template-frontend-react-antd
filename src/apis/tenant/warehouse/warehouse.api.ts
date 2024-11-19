import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class WarehouseApi extends BaseTenantApi {
    private baseUri = '/warehouse';

    create(entity: any) {
        return this.request.post(`${this.baseUri}/warehouses`, entity);
    }

    updateById(id: string, entity: any) {
        return this.request.put(`${this.baseUri}/warehouses/${id}`, entity);
    }

    queryById(id: string) {
        return this.request.get(`${this.baseUri}/warehouses/${id}`);
    }

    queryPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/warehouses/page`, {params});
    }

    queryList(params?: any) {
        return this.request.get(`${this.baseUri}/warehouses/list`, {params});
    }

    deleteByIds(ids: string[]) {
        return this.request.delete(`${this.baseUri}/warehouses/${ids.join(",")}`);
    }

}