import {WarehouseContainerStatus} from "@app/normal/warehouse/internal/warehouse.enums.ts";

export const WarehouseContainerStatusOptions = [
    {label: '正常', value: WarehouseContainerStatus.NORMAL},
    {label: '报废', value: WarehouseContainerStatus.SCRAP},
]