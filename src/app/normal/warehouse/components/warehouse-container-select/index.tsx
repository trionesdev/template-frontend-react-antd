import {FC} from "react";
import {FetchSelect} from "@trionesdev/antd-react-ext";
import {warehouseContainerApi} from "@apis/tenant";

type WarehouseContainerSelectProps = {
    value?: string
    onChange?: (value: string) => void
    warehouseId?: string
    areaCode?:string
}
export const WarehouseContainerSelect:FC<WarehouseContainerSelectProps> = ({value, onChange, warehouseId,areaCode}) => {
  return <FetchSelect placeholder={`请选择所属库位`} fetchRequest={() => {
      return warehouseContainerApi.queryList({enabled: true, warehouseId: warehouseId,areaCode:areaCode})
  }} fieldNames={{value: 'id', label: 'name'}} value={value} onChange={onChange}/>
}