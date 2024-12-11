import {FC} from "react";
import {FetchSelect} from "@trionesdev/antd-react-ext";
import {warehouseLocationApi} from "@apis/tenant";

type WarehouseLocationSelectProps = {
    value?: string
    onChange?: (value: string) => void
    warehouseCode?: string
}
export const WarehouseLocationSelect: FC<WarehouseLocationSelectProps> = ({value, onChange, warehouseCode}) => {
    return <FetchSelect placeholder={`请选择所属库位`} fetchRequest={() => {
        return warehouseLocationApi.queryList({enabled: true, warehouseCode})
    }} fieldNames={{value: 'id', label: 'name'}} value={value} onChange={onChange}/>
}