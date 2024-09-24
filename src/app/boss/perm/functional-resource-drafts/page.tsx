import {GridTable, Layout, PageHeader} from "@trionesdev/antd-react-ext";
import {useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis/boss";
import {ClientType} from "@app/boss/perm/internal/perm.enums.ts";
import {Button, message, Modal, Popconfirm, Space, Tag} from "antd";
import {
    FunctionalResourceDraftForm
} from "@app/boss/perm/functional-resource-drafts/functional-resource-draft-form/index.tsx";
import _ from "lodash";
import {useNavigate, useSearchParams} from "@trionesdev/commons-react";
import {RouteConstants} from "../../../../router/route.constants.ts";
import {AppOptions, ClientTypeOptions} from "@app/boss/perm/internal/perm.options.ts";
import {useAppConfig} from "../../../../commponents/app-config";


export const FunctionalResourceDraftsPage = () => {
    const appConfig = useAppConfig()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
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
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 150,
            render: (_text: any, record: any) => {
                return <Space>
                    <FunctionalResourceDraftForm id={record.id} onRefresh={() => {
                        handleQuery()
                    }}><Button size={`small`} type={`link`}>编辑</Button></FunctionalResourceDraftForm>
                    <Popconfirm title={`确定删除？`} onConfirm={() => {
                        functionalResourceApi.deleteFunctionalResourceDraftById(record.id).then(() => {
                            handleQuery()
                        }).catch(async (ex: any) => {
                            message.error(ex.message)
                        })
                    }}>
                        <Button type={`link`} danger disabled={!_.isEmpty(record.children)}>删除</Button>
                    </Popconfirm>
                </Space>
            }
        }
    ]
    return <Layout direction={`vertical`}>
        <Layout.Item>
            <PageHeader onBack={() => {
                navigate(RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.path!(), {
                    state: {
                        appIdentifier: searchParams.get('appIdentifier'),
                        clientType: searchParams.get('clientType')
                    }
                })
            }} title={<Space split={`-`}>
                {appConfig.multiTenant && searchParams.get('appIdentifier') &&
                    <span>{AppOptions.find((x: any) => x.value === searchParams.get('appIdentifier'))?.label}</span>}
                {searchParams.get('clientType') &&
                    <span>{ClientTypeOptions.find((x: any) => x.value === searchParams.get('clientType'))?.label}</span>}
            </Space>} extra={<Space>
                <FunctionalResourceDraftForm clientType={ClientType.PC_WEB}>
                    <Button type={`primary`}>新建功能资源</Button>
                </FunctionalResourceDraftForm>
                <Button onClick={() => {
                    Modal.confirm({
                        title: '确定要发布功能资源吗？',
                        content: '发布功能资源后，将覆盖已发布的功能资源，请谨慎操作！',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            functionalResourceApi.releaseFunctionalResourceDrafts({clientType: ClientType.PC_WEB}).then(async () => {
                                message.success(`发布成功`)
                            }).catch(async (ex: any) => {
                                message.error(ex.message)
                            })
                        }
                    })
                }}>发布功能资源</Button>

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
}