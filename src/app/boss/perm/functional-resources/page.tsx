import {GridTable, Layout, TableToolbar} from "@trionesdev/antd-react-ext";
import {useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "../../../../apis/boss";
import {ClientType} from "@app/boss/perm/internal/perm.enum.ts";
import {Button, Space, Tag} from "antd";
import {FunctionalResourceForm} from "@app/boss/perm/functional-resources/functional-resource-form/index.tsx";
import _ from "lodash";


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
            title: '资源对象名称',
            dataIndex: 'name',
            with: 200
        },
        {
            title: '标识',
            dataIndex: 'identifier',
            with: 200
        },
        {
            title: '操作',
            dataIndex: 'actions',
            render: (_text: any, _record: any) => {
                return <Space>
                    {_.map(_text, (action: any) => {
                        return <Tag key={action.identifier} bordered={false}>{action.name}</Tag>
                    })}
                </Space>
            }
        },
        {
            title: '操作',
            dataIndex: 'id',
            with: 100,
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
        <Layout.Item auto={true}>
            <GridTable fit={true} toolbar={<TableToolbar extra={<Space>
                <FunctionalResourceForm clientType={ClientType.PC_WEB}>
                    <Button type={`primary`}>新建功能资源</Button>
                </FunctionalResourceForm>
            </Space>}/>} size={`small`} columns={columns}
                       dataSource={treeData}
                       pagination={false} loading={loading} rowKey={`id`}/>
        </Layout.Item>
    </Layout>
}