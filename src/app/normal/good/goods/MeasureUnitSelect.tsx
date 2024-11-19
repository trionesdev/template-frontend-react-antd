import {FetchSelect} from "@trionesdev/antd-react-ext";
import {FC} from "react";
import {measureUnitApi} from "@apis/tenant";

type MeasureUnitSelectProps = {
    value?: string
    onChange?: (value: string) => void
}
export const MeasureUnitSelect: FC<MeasureUnitSelectProps> = ({value, onChange}) => {
    return <FetchSelect placeholder={`请选择单位`} fetchRequest={() => {
        return measureUnitApi.queryList({enabled: true})
    }} fieldNames={{value: 'code', label: 'name'}} value={value} onChange={onChange}/>
}