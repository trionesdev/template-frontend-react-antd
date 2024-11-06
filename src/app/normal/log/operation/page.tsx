import {GridTable, Layout} from "@trionesdev/antd-react-ext";
import {useEffect, useState} from "react";
import {PageResult} from "@apis";
import {useRequest} from "ahooks";
import {operationLogApi} from "@apis/tenant";

export const OperationLogsPage = () => {
    const [pageParams, setPageParams] = useState({pageNum: 1, pageSize: 10})
    const [result, setResult] = useState<PageResult<any>>({rows: [], total: 0})

    const {run: handleQueryPage, loading} = useRequest(() => {
        return operationLogApi.queryOperationLogsPage(pageParams)
    }, {
        manual: true,
        onSuccess: (res: any) => {
            setResult(res)
        }
    })

    useEffect(() => {
        handleQueryPage()
    }, [pageParams]);

    const columns: any[] = [
        {
            title: '类型',
            dataIndex: 'type',
            width: 120,
            render: (text: string) => {
                return <>{text}</>
            }
        },
        {
            title: '分类',
            dataIndex: 'category',
            width: 120,
            render: (text: string) => {
                return <>{text}</>
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 120,
            render: (text: string) => {
                return <>{text}</>
            }
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            width: 120,
            render: (text: any) => {
                return <>{text.nickname}</>
            }
        },
        {
            title: '操作内容',
            dataIndex: 'description',
            render: (text: string) => {
                return <>{text}</>
            }
        }
    ]

    return <Layout direction={`vertical`}>
        <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
            <GridTable fit={true} size={'small'} columns={columns} dataSource={result?.rows} rowKey={`id`}
                       loading={loading}
                       pagination={{
                           current: pageParams.pageNum,
                           total: result.total,
                           pageSize: pageParams.pageSize,
                           onChange: (page, pageSize) => {
                               setPageParams({pageNum: page, pageSize: pageSize})
                           }
                       }}/>
        </Layout.Item>
    </Layout>
}