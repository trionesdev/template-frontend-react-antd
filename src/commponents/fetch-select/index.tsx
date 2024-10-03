import {Select, SelectProps} from "antd";
import {FC, useEffect, useState} from "react";
import {useRequest} from "ahooks";
import _ from "lodash";

export type FetchSelectProps = {
    valueOption?: any
    fixedOptions?: any[]
    dropdownFetch?: boolean
    fetchEnable?: boolean
    fetchAlways?: boolean
    fetchRequest?: (searchValue?: string) => Promise<any>
} & Omit<SelectProps, 'options' | 'onDropdownVisibleChange'>
export const FetchSelect: FC<FetchSelectProps> = ({
                                                      valueOption,
                                                      fixedOptions,
                                                      dropdownFetch = false,
                                                      fetchEnable = true,
                                                      fetchAlways = false,
                                                      fetchRequest,
                                                      ...props
                                                  }) => {
    const [fetched, setFetched] = useState(false)
    const [options, setOptions] = useState(_.concat([], fixedOptions || [], valueOption || []))
    const {run: handleQuery} = useRequest((searchValue?: string) => {
        return (fetchRequest && fetchEnable) ? fetchRequest(searchValue) : Promise.resolve([])
    }, {
        manual: dropdownFetch,
        onSuccess: (data: any) => {
            setOptions([...(fixedOptions || []), ...(data || [])])
        },
        onFinally: () => {
            setFetched(true)
        }
    })

    useEffect(() => {
        if (fetched) {
            handleQuery()
        }
    }, [fetchRequest]);

    useEffect(() => {
        if (!_.isEmpty(valueOption)) {
            const newOptions = [...(fixedOptions || []), ...options]
            if (_.isArray(valueOption)) {
                valueOption.forEach((item: any) => {
                    if (!_.find(newOptions, (o: any) => o.value === item.value)) {
                        newOptions.push(item)
                    }
                })
            } else {
                if (!options.find((item: any) => item.value === valueOption.value)) {
                    setOptions([...(fixedOptions || []), ...options, valueOption])
                }
            }
        }

        return () => {
            setOptions([])
            setFetched(false)
        }
    }, [valueOption]);

    return <Select {...props}
                   options={options}
                   onSearch={props.showSearch ? handleQuery : undefined}
                   onDropdownVisibleChange={(open) => {
                       if (open && dropdownFetch && fetchEnable && (fetchAlways || !fetched)) {
                           handleQuery()
                       }
                   }}/>
}