import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class WarehouseInboundPlanApi extends BaseTenantApi {
  private baseUri = '/warehouse';

  create(entity: any) {
    return this.request.post(`${this.baseUri}/inbound-plans`, entity);
  }

  updateById(entity: any) {
    return this.request.put(`${this.baseUri}/inbound-plans`, entity);
  }

  queryById(id: string) {
    return this.request.get(`${this.baseUri}/inbound-plans/${id}`);
  }

  queryPage(params: PageQueryParams) {
    return this.request.get(`${this.baseUri}/inbound-plans/page`, {params});
  }

  deleteById(id: string) {
    return this.request.delete(`${this.baseUri}/inbound-plans/${id}`);
  }

  deleteByIds(ids: any[]) {
    return this.request.delete(`${this.baseUri}/inbound-plans/${ids.join(",")}`);
  }

  cancel(id: string) {
    return this.request.put(`${this.baseUri}/inbound-plans/cancel/${id}`);
  }

}