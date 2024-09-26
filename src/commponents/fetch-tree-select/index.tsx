import {TreeSelect, TreeSelectProps} from "antd";
import {FC, useEffect, useState} from "react";
import {useRequest} from "ahooks";
import _ from "lodash";

export type FetchTreeSelectProps = {
    valueOption?: any
    fixedOptions?: any[]
    dropdownFetch?: boolean
    fetchEnable?: boolean
    fetchAlways?: boolean
    fetchRequest?: (searchValue?: string) => Promise<any>
} & Omit<TreeSelectProps, 'treeData' | 'onDropdownVisibleChange'>
export const FetchTreeSelect: FC<FetchTreeSelectProps> = ({
                                                              valueOption,
                                                              fixedOptions,
                                                              dropdownFetch = false,
                                                              fetchEnable = true,
                                                              fetchAlways,
                                                              fetchRequest,
                                                              ...props
                                                          }) => {
    const [fetched, setFetched] = useState(false)
    const [options, setOptions] = useState(_.concat([], fixedOptions || [], valueOption || []))
    const {run: handleQuery} = useRequest((searchValue?: string) => {
        return fetchRequest ? fetchRequest(searchValue) : Promise.resolve([])
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
        setOptions(_.concat([], fixedOptions || [], valueOption || []))
        return () => {
            setOptions([])
            setFetched(false)
        }
    }, [valueOption]);

    return <TreeSelect {...props}
                       treeData={options}
                       onSearch={props.showSearch ? handleQuery : undefined}
                       onDropdownVisibleChange={(open) => {
                           if (open && dropdownFetch && fetchEnable && (fetchAlways || !fetched)) {
                               handleQuery()
                           }
                       }}/>
}