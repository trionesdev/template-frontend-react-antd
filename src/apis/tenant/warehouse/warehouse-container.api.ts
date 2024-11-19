import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class WarehouseContainerApi extends BaseTenantApi {
    private baseUri = '/warehouse';

    create(entity: any) {
        return this.request.post(`${this.baseUri}/warehouse-containers`, entity);
    }

    updateById(id: string, entity: any) {
        return this.request.put(`${this.baseUri}/warehouse-containers/${id}`, entity);
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