import {WarehouseApi} from "@apis/tenant/warehouse/warehouse.api.ts";
import {WarehouseAreaApi} from "@apis/tenant/warehouse/warehouse-area.api.ts";
import {WarehouseLocationApi} from "@apis/tenant/warehouse/warehouse-location.api.ts";
import {WarehouseContainerApi} from "@apis/tenant/warehouse/warehouse-container.api.ts";
import {WarehouseInboundPlanApi} from "@apis/tenant/warehouse/warehouse-inbound-plan.api.ts";
import {InboundApi} from "@apis/tenant/warehouse/inbound.api.ts";

export const warehouseApi = new WarehouseApi()
export const warehouseAreaApi = new WarehouseAreaApi()
export const warehouseLocationApi = new WarehouseLocationApi()
export const warehouseContainerApi = new WarehouseContainerApi()
export const warehouseInboundPlanApi = new WarehouseInboundPlanApi()

export const inboundApi = new InboundApi()