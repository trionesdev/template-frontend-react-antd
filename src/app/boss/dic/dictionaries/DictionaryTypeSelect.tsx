import {FC} from "react";
import {FetchSelect} from "../../../../commponents/fetch-select";
import {dictionaryApi} from "@apis/boss";

type DictionaryTypeSelectProps = {
    value?: string
    onChange?: (value: string) => void
}
export const DictionaryTypeSelect: FC<DictionaryTypeSelectProps> = ({value, onChange}) => {
    return <FetchSelect fetchRequest={() => {
        return dictionaryApi.queryDictionaryList({type: 'GROUP'})
    }} fieldNames={{value: 'code', label: 'name'}} value={value} onChange={onChange}/>
}