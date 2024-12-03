import {WarehouseContainerStatus} from "@app/normal/warehouse/internal/warehouse.enums.ts";

export const WarehouseContainerStatusOptions = [
    {label: '正常', value: WarehouseContainerStatus.NORMAL},
    {label: '报废', value: WarehouseContainerStatus.SCRAP},
]

export const relatedOrderSourceOptions = [
    {label: "采购", value: "PURCHASE"},
    {label: "计划单", value: "PLAN"},
    {label: "生产", value: "PRODUCTION"},
]

export const inboundTypeOptions = [
    {label: "采购", value: "PURCHASE"},
    {label: "生产", value: "PRODUCTION"},
]

export const warehouseInboundPlanStatusOptions = [
    {label: "计划中", value: "PLANNING"},
    {label: "已取消", value: "CANCELLED"},
    {label: "部分入库", value: "PART_INBOUND"},
    {label: "全部入库", value: "FINISHED"},
]