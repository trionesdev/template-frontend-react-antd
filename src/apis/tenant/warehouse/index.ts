import {WarehouseApi} from "@apis/tenant/warehouse/warehouse.api.ts";
import {WarehouseAreaApi} from "@apis/tenant/warehouse/warehouse-area.api.ts";
import {WarehouseLocationApi} from "@apis/tenant/warehouse/warehouse-location.api.ts";
import {WarehouseContainerApi} from "@apis/tenant/warehouse/warehouse-container.api.ts";

export const warehouseApi = new WarehouseApi()
export const warehouseAreaApi = new WarehouseAreaApi()
export const warehouseLocationApi = new WarehouseLocationApi()
export const warehouseContainerApi = new WarehouseContainerApi()
