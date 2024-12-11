import {FetchSelect} from "@trionesdev/antd-react-ext";
import {FC} from "react";
import {warehouseAreaApi} from "@apis/tenant";

type WarehouseAreaSelectProps = {
    value?: string
    onChange?: (value: string) => void
    warehouseId?: string
}
export const WarehouseAreaSelect: FC<WarehouseAreaSelectProps> = ({value, onChange, warehouseId}) => {
    return <FetchSelect placeholder={`请选择所属库区`} fetchRequest={() => {
        return warehouseAreaApi.queryList({enabled: true, warehouseId: warehouseId})
    }} fieldNames={{value: 'id', label: 'name'}} value={value} onChange={onChange}/>
}