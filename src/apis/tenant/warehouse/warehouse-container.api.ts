import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class WarehouseContainerApi extends BaseTenantApi {
    private baseUri = '/warehouse';

    create(warehouse: any) {
        return this.request.post(`${this.baseUri}/warehouse-containers`, warehouse);
    }

    updateById(id: string, warehouse: any) {
        return this.request.put(`${this.baseUri}/warehouse-containers/${id}`, warehouse);
    }

    queryById(id: string) {
        return this.request.get(`${this.baseUri}/warehouse-containers/${id}`);
    }

    queryPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/warehouse-containers/page`, {params});
    }

    queryList(params?: any) {
        return this.request.get(`${this.baseUri}/warehouse-containers/list`, {params});
    }

    deleteByIds(ids: string[]) {
        return this.request.delete(`${this.baseUri}/warehouse-containers/${ids.join(",")}`);
    }

}