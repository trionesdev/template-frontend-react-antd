import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class WarehouseApi extends BaseTenantApi {
    private baseUri = '/warehouse';

    createWarehouse(warehouse: any) {
        return this.request.post(`${this.baseUri}/warehouses`, warehouse);
    }

    updateWarehouseById(id: string, warehouse: any) {
        return this.request.put(`${this.baseUri}/warehouses/${id}`, warehouse);
    }

    queryWarehouseById(id: string) {
        return this.request.get(`${this.baseUri}/warehouses/${id}`);
    }

    queryWarehousePage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/warehouses/page`, {params});
    }

    queryWarehouseList(params?: any) {
        return this.request.get(`${this.baseUri}/warehouses/page`, {params});
    }

    deleteWarehouseByIds(ids: string[]) {
        return this.request.delete(`${this.baseUri}/warehouses/${ids.join(",")}`);
    }

}