import {BaseTenantApi} from "@apis/tenant/base-tenant.api.ts";
import {PageQueryParams} from "@apis";

export class InboundApi extends BaseTenantApi {
    private baseUri = '/warehouse';

    createInboundOrder(data: any) {
        return this.request.post(`${this.baseUri}/inbound-orders`, data)
    }

    updateInboundOrderById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/inbound-orders/${id}`, data)
    }

    findInboundOrderById(id: string) {
        return this.request.get(`${this.baseUri}/inbound-orders/${id}`)
    }

    findInboundOrderPage(params?: PageQueryParams) {
        return this.request.get(`${this.baseUri}/inbound-order/page`, {params})
    }

    findInboundOrderItemById(id: string) {
        return this.request.get(`${this.baseUri}/inbound-order/items/${id}`)
    }

    receiveGoods(id: string, data: any) {
        return this.request.post(`${this.baseUri}/inbound-orders/${id}/receive-goods`, data)
    }

    updateInboundOrderItemById(id: string, data: any) {
        return this.request.put(`${this.baseUri}/inbound-order/items/${id}`, data)
    }

    findInboundOrderItemsByOrderId(orderId: string) {
        return this.request.get(`${this.baseUri}/inbound-orders/${orderId}/item/list`)
    }
}