import {useState} from "react";
import {GridTable, Layout, SearchToolbar} from "@trionesdev/antd-react-ext";
import {useRequest} from "ahooks";
import {countryApi} from "@apis/boss";
import {Input} from "antd";

export const CountriesPage = () => {
    const [searchParams, setSearchParams] = useState<any>()
    const [queryParams, setQueryParams] = useState<any>()
    const [rows, setRows] = useState<any>([])

    const {run: handleQuery, loading} = useRequest(() => {
        const params = {...queryParams, ...searchParams}
        return countryApi.queryCountryList(params)
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

    return <Layout direction={`vertical`} style={{height: '100%', gap: '8px'}}>
        <Layout.Item style={{backgroundColor: 'white'}}>
            <SearchToolbar items={[
                {label: '名称', name: 'name', children: <Input type={'text'}/>}
            ]} onSearchParamsChange={(params) => {
                setSearchParams(params)
            }} onReset={() => setSearchParams({})} onSearch={handleQuery}/>
        </Layout.Item>
        <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
            <GridTable fit={true} size={`small`} columns={columns} dataSource={rows} rowKey={`id`} loading={loading}
                       pagination={false}/>
        </Layout.Item>
    </Layout>
}