import {FC} from "react";
import {functionalResourceApi} from "@apis/boss";
import {FetchTreeSelect} from "@trionesdev/antd-react-ext";

type FunctionalResourceSelectProps = {
    value?: string
    onChange?: (value: string) => void
    valueOption?: any
    appCode?: string
    clientType?: string
}
export const FunctionalResourceSelect: FC<FunctionalResourceSelectProps> = ({
                                                                                value,
                                                                                onChange,
                                                                                valueOption,
                                                                                appCode,
                                                                                clientType
                                                                            }) => {
    return <FetchTreeSelect value={value} onChange={onChange}
                            fieldNames={{label: 'name', value: 'id'}}
                            dropdownFetch={true}
                            initialValueOption={valueOption}
                            fetchAlways={true}
                            fetchEnable={false}
                            fixedOptions={[{name: '无父级资源', id: '0'}]}
                            fetchRequest={() => {
                                return functionalResourceApi.queryFunctionalResourceTree({
                                    appCode,
                                    clientType
                                }).then((res: any) => {
                                    return res || []
                                })
                            }}/>
}