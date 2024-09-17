import {GridTable, Layout, PageHeader} from "@trionesdev/antd-react-ext";
import {useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis";
import {ClientType} from "@app/boss/perm/internal/perm.enum.ts";
import {Button, Space, Tag} from "antd";
import _ from "lodash";
import {RedoOutlined} from "@ant-design/icons";
import {useNavigate} from "@trionesdev/commons-react";
import {RouteConstants} from "../../../../router/route.constants.ts";

export const FunctionalResourcesPage = () => {
    const navigate = useNavigate()
    const [treeData, setTreeData] = useState<any[] | undefined>()

    const {run: handleQuery, loading} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceTree({clientType: ClientType.PC_WEB})
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
            width: 200
        },
        {
            title: '标识',
            dataIndex: 'identifier',
            width: 200
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
        }
    ]

    return <Layout direction={`vertical`}>
        <Layout.Item>
            <PageHeader backIcon={false} extra={<Space>
                <Button icon={<RedoOutlined/>} type={`text`} onClick={handleQuery}/>
                <Button type={`primary`} onClick={() => {
                    navigate(RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCE_DRAFTS.path!())
                }}>资源编辑</Button>
            </Space>}/>
        </Layout.Item>
        <Layout.Item auto={true}>
            <GridTable
                fit={true}
                size={`small`} columns={columns}
                dataSource={treeData}
                expandable={{
                    defaultExpandAllRows: true,
                    defaultExpandedRowKeys: ["0"],
                }}
                pagination={false} loading={loading} rowKey={`id`}/>
        </Layout.Item>
    </Layout>
};