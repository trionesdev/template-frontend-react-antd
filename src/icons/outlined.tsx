import CustomerSvg from "./svg/customer.svg?react"
import SupplierSvg from "./svg/supplier.svg?react"
import InventorySvg from "./svg/inventory.svg?react"
import MasterDataSvg from "./svg/master-data.svg?react"
import ManufactureSvg from "./svg/manufacture.svg?react"
import TenantSvg from "./svg/tenant.svg?react"
import Icon from "@ant-design/icons";

export const CustomerOutlined = () => {
    return <Icon component={CustomerSvg}/>
}

export const SupplierOutlined = () => {
    return <Icon component={SupplierSvg}/>
}
export const InventoryOutlined = () => {
    return <Icon component={InventorySvg}/>
}
export const MasterDataOutlined = () => {
    return <Icon component={MasterDataSvg}/>
}

export const ManufactureOutlined = () => {
    return <Icon component={ManufactureSvg}/>
}

export const TenantOutlined = () => {
    return <Icon component={TenantSvg}/>
}
