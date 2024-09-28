import {FC, useEffect, useState} from "react";
import {GridTable, Layout, PageHeader, TableToolbar} from "@trionesdev/antd-react-ext";
import {useRequest} from "ahooks";
import {departmentApi} from "@apis/backend";
import {Button, message, Popconfirm, Space} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import {DepartmentMemberForm} from "@app/normal/org/org-structure/DepartmentMemberForm.tsx";

type DepartmentMembersProps = {
    department?: any
}
export const DepartmentMembersPanel: FC<DepartmentMembersProps> = ({department}) => {
    const [pageParams, setPageParams] = useState({pageNum: 1, pageSize: 10})
    const [pageResult, setPageResult] = useState<{ rows: any[], total: number }>({rows: [], total: 0})

    const {run: queryDepartmentMemberPage, loading} = useRequest(() => {
        const params = {...pageParams, departmentId: department?.id}
        return departmentApi.queryDepartmentMemberPage(params)
    }, {
        onSuccess(data: any) {
            setPageResult(data)
        }
    })

    useEffect(() => {
        queryDepartmentMemberPage()
    }, [department]);

    const columns: any[] = [
        {
            title: '姓名',
            dataIndex: ['member', 'nickname']
        },
        {
            title: '用户名',
            dataIndex: ['member', 'username']
        },
        {
            title: '手机',
            dataIndex: ['member', 'phone']
        },
        {
            title: '邮箱',
            dataIndex: ['member', 'email']
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 100,
            render(id: string) {
                return <Space>
                    <Button size={`small`} type={`link`}>编辑</Button>
                    <Popconfirm title={`确定删除部门成员？`} onConfirm={() => {
                        departmentApi.deleteDepartmentMemberById(id).then(async () => {
                            message.success(`删除部门成员成功`)
                            queryDepartmentMemberPage()
                        }).catch(async (ex: any) => {
                            message.error(ex?.message)
                        })
                    }}>
                        <Button size={`small`} type={`link`} danger={true}>删除</Button>
                    </Popconfirm>
                </Space>
            }
        }
    ]

    return <Layout direction={`vertical`}>
        <Layout.Item>
            <PageHeader title={department?.name} backIcon={false}/>
        </Layout.Item>
        <Layout.Item auto={true}>
            <GridTable
                toolbar={<TableToolbar title={<Space>
                    <DepartmentMemberForm departmentId={department?.id} onRefresh={queryDepartmentMemberPage}>
                        <Button type={`primary`} icon={<UserAddOutlined/>}>新增成员</Button>
                    </DepartmentMemberForm>
                </Space>}/>}
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