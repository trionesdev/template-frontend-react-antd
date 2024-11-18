import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class WarehouseLocationApi extends BaseTenantApi {
    private baseUri = '/warehouse';

    create(warehouse: any) {
        return this.request.post(`${this.baseUri}/warehouse-locations`, warehouse);
    }

    updateById(id: string, warehouse: any) {
        return this.request.put(`${this.baseUri}/warehouse-locations/${id}`, warehouse);
    }

    queryById(id: string) {
        return this.request.get(`${this.baseUri}/warehouse-locations/${id}`);
    }

    queryPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/warehouse-locations/page`, {params});
    }

    queryList(params?: any) {
        return this.request.get(`${this.baseUri}/warehouse-locations/list`, {params});
    }

    deleteByIds(ids: string[]) {
        return this.request.delete(`${this.baseUri}/warehouse-locations/${ids.join(",")}`);
    }

}