import {FC, useEffect, useState} from "react";
import {GridTable, Layout, PageHeader} from "@trionesdev/antd-react-ext";
import {useRequest} from "ahooks";
import {departmentApi} from "@apis";
import {Space} from "antd";

type DepartmentMembersProps = {
    department?: any
}
export const DepartmentMembers: FC<DepartmentMembersProps> = ({department}) => {
    const [pageParams, setPageParams] = useState({pageNum: 1, pageSize: 10})
    const [pageResult, setPageResult] = useState<{ rows: any[], total: number }>({rows: [], total: 0})

    const {run, loading} = useRequest(() => {
        let params = {...pageParams, departmentId: department?.id}
        return departmentApi.queryDepartmentMembers(params)
    }, {
        onSuccess(data: any) {
            setPageResult(data)
        }
    })

    useEffect(() => {
        run()
    }, [department]);

    const columns: any[] = [
        {
            title: '姓名',
            dataIndex: ['member', 'nickname']
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 100,
            render(id: string) {
                return <Space></Space>
            }
        }
    ]

    return <Layout direction={`vertical`}>
        <Layout.Item>
            <PageHeader title={department?.name} backIcon={false}/>
        </Layout.Item>
        <Layout.Item auto={true}>
            <GridTable
                fit={true} size={'small'} columns={columns}
                dataSource={pageResult?.rows} rowKey={`id`}
                loading={loading}
                pagination={{
                    current: pageParams.pageNum,
                    total: pageResult.total,
                    pageSize: pageParams.pageSize,
                    onChange: (page, pageSize) => {
                        setPageParams({pageNum: page, pageSize: pageSize})
                    }
                }}/>
        </Layout.Item>
    </Layout>
}