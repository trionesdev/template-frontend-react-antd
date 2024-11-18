import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class WarehouseAreaApi extends BaseTenantApi {
    private baseUri = '/warehouse';

    create(warehouse: any) {
        return this.request.post(`${this.baseUri}/warehouse-areas`, warehouse);
    }

    updateById(id: string, warehouse: any) {
        return this.request.put(`${this.baseUri}/warehouse-areas/${id}`, warehouse);
    }

    queryById(id: string) {
        return this.request.get(`${this.baseUri}/warehouse-areas/${id}`);
    }

    queryPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/warehouse-areas/page`, {params});
    }

    queryList(params?: any) {
        return this.request.get(`${this.baseUri}/warehouse-areas/list`, {params});
    }

    deleteByIds(ids: string[]) {
        return this.request.delete(`${this.baseUri}/warehouse-areas/${ids.join(",")}`);
    }

}