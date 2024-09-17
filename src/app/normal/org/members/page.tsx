import {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {GridTable, Layout, TableToolbar} from "@trionesdev/antd-react-ext";
import {Button, Space} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {TenantMemberForm} from "./TenantMemberForm";
import {PageResult} from "@apis";
import {tenantApi} from "@apis";

export const TenantMembersPage = () => {

    const [pageParams, setPageParams] = useState({pageNum: 1, pageSize: 10})
    const [result, setResult] = useState<PageResult<any>>({rows: [], total: 0})

    const {run: handleQuery, loading} = useRequest(() => {
        const params = {...pageParams}
        return tenantApi.queryTenantMembersPage(params)
    }, {
        manual: true,
        onSuccess: (res: any) => {
            setResult(res)
        }
    })

    useEffect(() => {
        handleQuery()
    }, [pageParams]);

    const columns: any[] = [
        {
            title: '姓名',
            dataIndex: 'nickname'
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: (id: string, record: any) => {
                return <Space>
                    <TenantMemberForm id={record.id} onRefresh={handleQuery}><Button size={`small`}
                                                                                     type={`link`}>编辑</Button></TenantMemberForm>
                </Space>
            }
        }
    ]

    return (
        <Layout>
            <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
                <GridTable
                    toolbar={<TableToolbar title={<Space>
                        <TenantMemberForm onRefresh={handleQuery}>
                            <Button type={`primary`} icon={<PlusCircleOutlined/>}>添加成员</Button>
                        </TenantMemberForm>
                    </Space>}/>}
                    fit={true} size={'small'} columns={columns} dataSource={result?.rows} rowKey={`id`}
                    loading={loading}
                    pagination={{
                        current: pageParams.pageNum,
                        total: result.total,
                        pageSize: pageParams.pageSize,
                        onChange: (page, pageSize) => {
                            setPageParams({pageNum: page, pageSize: pageSize})
                        }
                    }}
                />
            </Layout.Item>
        </Layout>
    );
}