import {FetchSelect} from "@trionesdev/antd-react-ext";
import {FC} from "react";
import {warehouseApi} from "@apis/tenant";

type WarehouseSelectProps = {
    value?: string
    onChange?: (value: string) => void
}
export const WarehouseSelect: FC<WarehouseSelectProps> = ({value, onChange}) => {
    return <FetchSelect placeholder={`请选择所属仓库`} fetchRequest={() => {
        return warehouseApi.queryList({enabled: true})
    }} fieldNames={{value: 'id', label: 'name'}} value={value} onChange={onChange}/>
}