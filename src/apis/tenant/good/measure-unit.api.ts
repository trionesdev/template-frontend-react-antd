import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class MeasureUnitApi extends BaseTenantApi {
    private baseUri = '/good';

    create(entity: any) {
        return this.request.post(`${this.baseUri}/measure-units`, entity);
    }

    updateById(id: string, entity: any) {
        return this.request.put(`${this.baseUri}/measure-units/${id}`, entity);
    }

    queryById(id: string) {
        return this.request.get(`${this.baseUri}/measure-units/${id}`);
    }

    queryPage(params: PageQueryParams) {
        return this.request.get(`${this.baseUri}/measure-units/page`, {params});
    }

    queryList(params?: any) {
        return this.request.get(`${this.baseUri}/measure-units/list`, {params});
    }

    deleteByIds(ids: string[]) {
        return this.request.delete(`${this.baseUri}/measure-units/${ids.join(",")}`);
    }

}