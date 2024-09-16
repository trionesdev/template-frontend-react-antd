import {GridTable, Layout, TableToolbar} from "@trionesdev/antd-react-ext";
import {useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "../../../../apis/boss";
import {ClientType} from "@app/boss/perm/internal/perm.enum.ts";
import {Button, Space} from "antd";
import {FunctionalResourceForm} from "@app/boss/perm/functional-resources/functional-resource-form/index.tsx";


export const FunctionalResourcesPage = () => {
    const [treeData, setTreeData] = useState<any[] | undefined>()

    const {run: handleQuery, loading} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceDraftTree({clientType: ClientType.PC_WEB})
    }, {
        onSuccess: (res: any) => {
            if (res) {
                setTreeData(res || [])
            }
        }
    })


    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: (_text: any, record: any) => {
                return <Space>
                    <FunctionalResourceForm id={record.id} onRefresh={() => {
                        handleQuery()
                    }}><Button size={`small`} type={`link`}>编辑</Button></FunctionalResourceForm>
                </Space>
            }
        }
    ]
    return <Layout direction={`vertical`}>
        <Layout.Item>
            <GridTable toolbar={<TableToolbar extra={<Space>
                <FunctionalResourceForm clientType={ClientType.PC_WEB}>
                    <Button type={`primary`}>新建功能资源</Button>
                </FunctionalResourceForm>
            </Space>}/>} size={`small`} columns={columns}
                       dataSource={treeData}
                       pagination={false} loading={loading} rowKey={`id`}/>
        </Layout.Item>
    </Layout>
}