import {GridTable, Layout, PageHeader} from "@trionesdev/antd-react-ext";
import {useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis/boss";
import {Button, Select, Space, Tag} from "antd";
import _ from "lodash";
import {RedoOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "@trionesdev/commons-react";
import {RouteConstants} from "../../../../router/route.constants.ts";
import {AppOptions, ClientTypeOptions} from "@app/boss/perm/internal/perm.options.ts";
import {ClientType} from "@app/boss/perm/internal/perm.enums.ts";
import {useAppConfig} from "../../../../commponents/app-config";

export const FunctionalResourcesPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const appConfig = useAppConfig()
    const [appIdentifier, setAppIdentifier] = useState<string | undefined>(location.state?.appIdentifier || AppOptions?.[0]?.value)
    const [clientType, setClientType] = useState<string | undefined>(location.state?.clientType || AppOptions?.[0].clients?.[0]?.value || ClientType.PC_WEB)
    const [treeData, setTreeData] = useState<any[] | undefined>()

    const {run: handleQuery, loading} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceTree({
            appIdentifier: appConfig.multiTenant ? appIdentifier : null,
            clientType
        })
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
            <PageHeader backIcon={false} title={<Space>
                {appConfig.multiTenant &&
                    <Select options={AppOptions} defaultValue={appIdentifier} onChange={(value) => {
                        setAppIdentifier(value)
                        setClientType(AppOptions.find(item => item.value !== value)?.clients?.[0]?.value);
                    }}/>}
                <Select options={ClientTypeOptions}
                        defaultValue={clientType} value={clientType}/>
            </Space>} extra={<Space>
                <Button icon={<RedoOutlined/>} type={`text`} onClick={handleQuery}/>
                <Button type={`primary`} onClick={() => {
                    const searchParams = new URLSearchParams();
                    if (appConfig.multiTenant && appIdentifier) {
                        searchParams.set('appIdentifier', appIdentifier)
                    }
                    if (clientType) {
                        searchParams.set('clientType', clientType)
                    }
                    navigate(`${RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCE_DRAFTS.path!()}?${searchParams.toString()}`)
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