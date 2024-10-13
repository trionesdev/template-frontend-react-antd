import {useState} from "react";
import {GridTable} from "@trionesdev/antd-react-ext";
import {useRequest} from "ahooks";
import {countryApi} from "@apis/boss";

export const CountriesPage = () => {
    const [queryParams, setQueryParams] = useState()
    const [rows, setRows] = useState<any>([])

    const {run: handleQuery, loading} = useRequest(() => {
        return countryApi.queryCountryList(queryParams)
    }, {
        onSuccess: (res: any) => {
            if (res) {
                setRows(res || [])
            }
        }
    })

    const columns: any[] = [
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '代码',
            dataIndex: 'code'
        },
        {
            title: '缩写',
            dataIndex: 'abbr'
        },
        {
            title: '英文名',
            dataIndex: 'nameEn'
        }
    ]

    return <div style={{height: '100%', backgroundColor: '#fff'}}>
        <GridTable fit={true} size={`small`} columns={columns} dataSource={rows} loading={loading}/>
    </div>
}