import {GridTable, Layout, PageHeader} from "@trionesdev/antd-react-ext";
import {useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis/boss";
import {Button, Select, Space} from "antd";
import {EditOutlined, RedoOutlined} from "@ant-design/icons";
import {AppOptions, ClientTypeOptions, ResourceTypeOptions} from "@app/boss/perm/shared/perm.options.ts";
import {ClientType} from "@app/boss/perm/shared/perm.enums.ts";
import {useAppConfig} from "@components/app-config";
import _ from "lodash";
import {icons} from "@components/icon-select";
import {FunctionalResourceDrafts} from "@app/boss/perm/functional-resources/FunctionalResourceDrafts.tsx";

export const FunctionalResourcesPage = () => {
    const appConfig = useAppConfig()
    const [appCode, setAppCode] = useState<string | undefined>(AppOptions?.[0]?.value)
    const [clientType, setClientType] = useState<ClientType | undefined>(AppOptions?.[0].clients?.[0]?.value || ClientType.PC_WEB)
    const [treeData, setTreeData] = useState<any[] | undefined>()
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])

    const {run: handleQuery, loading} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceTree({
            appCode: appConfig.multiTenant ? appCode : null,
            clientType
        })
    }, {
        onSuccess: (res: any) => {
            if (res) {
                setTreeData(res || [])
            }
        }
    })

    const handleExpandedAll = () => {
        function collectParentIds(data: any[] | undefined): string[] {
            if (_.isEmpty(data)) {
                return []
            }
            const parentIds: string[] = []
            _.forEach(data, (item: any) => {
                parentIds.push(item.parentId)
                if (_.isArray(item.children) && !_.isEmpty(item.children)) {
                    const childrenParentIds = collectParentIds(item.children as any[])
                    parentIds.push(...childrenParentIds)
                }
            })
            return parentIds
        }

        setExpandedRowKeys(collectParentIds(treeData))
    }

    const columns: any[] = [
        {
            title: '类型',
            dataIndex: 'type',
            width: 200,
            minWidth: 200,
            fixed: `left`,
            render: (type: string) => {
                return ResourceTypeOptions.find(item => item.value === type)?.label
            }
        },
        {
            title: '名称',
            dataIndex: 'name',
            width: 200,
            minWidth: 200,
            fixed: `left`,
        },
        {
            title: '图标',
            dataIndex: 'icon',
            width: 50,
            minWidth: 50,
            align: 'center',
            render: (icon: string) => {
                return <>{_.get(icons, icon)}</>
            }
        },
        {
            title: '标识',
            dataIndex: 'uniqueCode',
            width: 250,
            minWidth: 250
        },
        {
            title: '描述',
            dataIndex: 'description',
            minWidth: 200
        }
    ]

    return <Layout direction={`vertical`}>
        <Layout.Item>
            <PageHeader backIcon={false} title={<Space>
                {appConfig.multiTenant && _.size(AppOptions) > 0 &&
                    <Select options={AppOptions} defaultValue={appCode} onChange={(value) => {
                        setAppCode(value)
                        setClientType(AppOptions.find(item => item.value !== value)?.clients?.[0]?.value);
                    }}/>}
                {_.size(ClientTypeOptions) > 0 && <Select options={ClientTypeOptions}
                                                          defaultValue={clientType} value={clientType}/>}
                <Button onClick={handleExpandedAll}>全部展开</Button>
                <Button onClick={() => {
                    setExpandedRowKeys([])
                }}>全部收起</Button>
            </Space>} extra={<Space>
                <Button icon={<RedoOutlined/>} type={`text`} onClick={handleQuery}/>
                <FunctionalResourceDrafts onRefresh={handleQuery}>
                    <Button type={`primary`} icon={<EditOutlined/>}>编辑草稿</Button>
                </FunctionalResourceDrafts>
            </Space>}/>
        </Layout.Item>
        <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
            <GridTable
                fit={true}
                size={`small`} columns={columns}
                dataSource={treeData}
                expandable={{
                    defaultExpandAllRows: true,
                    defaultExpandedRowKeys: expandedRowKeys,
                    expandedRowKeys,
                    onExpand: (expanded, record) => {
                        if (expanded) {
                            setExpandedRowKeys([...expandedRowKeys, record.id])
                        } else {
                            setExpandedRowKeys(expandedRowKeys.filter(item => item !== record.id))
                        }
                    }
                }}
                scroll={{x: 1000}}
                pagination={false} loading={loading} rowKey={`id`}/>
        </Layout.Item>
    </Layout>
};