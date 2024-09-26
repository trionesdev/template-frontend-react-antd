import {GridTable, Layout, PageHeader} from "@trionesdev/antd-react-ext";
import {useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis/boss";
import {Button, Select, Space} from "antd";
import {RedoOutlined} from "@ant-design/icons";
import {AppOptions, ClientTypeOptions, ResourceTypeOptions} from "@app/boss/perm/internal/perm.options.ts";
import {ClientType} from "@app/boss/perm/internal/perm.enums.ts";
import {useAppConfig} from "../../../../commponents/app-config";
import {FunctionalResourceForm} from "@app/boss/perm/functional-resources/FunctionalResourceForm.tsx";

export const FunctionalResourcesPage = () => {
    const appConfig = useAppConfig()
    const [appCode, setAppCode] = useState<string | undefined>(AppOptions?.[0]?.value)
    const [clientType, setClientType] = useState<ClientType | undefined>(AppOptions?.[0].clients?.[0]?.value || ClientType.PC_WEB)
    const [treeData, setTreeData] = useState<any[] | undefined>()

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

    const columns = [
        {
            title: '类型',
            dataIndex: 'type',
            width: 100,
            render: (type: string) => {
                return ResourceTypeOptions.find(item => item.value === type)?.label
            }
        },
        {
            title: '名称',
            dataIndex: 'name',
            width: 200
        },
        {
            title: '标识',
            dataIndex: 'uniqueCode',
            width: 200
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 100,
            render: (id: string) => {
                return <Space>
                    <FunctionalResourceForm appCode={appCode} clientType={clientType} parentId={id} onRefresh={handleQuery}>
                        <Button size={`small`} type={`link`}>添加子项</Button>
                    </FunctionalResourceForm>
                    <FunctionalResourceForm appCode={appCode} clientType={clientType} id={id} onRefresh={handleQuery}>
                        <Button size={`small`} type={`link`}>编辑</Button>
                    </FunctionalResourceForm>
                </Space>
            }
        }
    ]

    return <Layout direction={`vertical`}>
        <Layout.Item>
            <PageHeader backIcon={false} title={<Space>
                {appConfig.multiTenant &&
                    <Select options={AppOptions} defaultValue={appCode} onChange={(value) => {
                        setAppCode(value)
                        setClientType(AppOptions.find(item => item.value !== value)?.clients?.[0]?.value);
                    }}/>}
                <Select options={ClientTypeOptions}
                        defaultValue={clientType} value={clientType}/>
            </Space>} extra={<Space>
                <Button icon={<RedoOutlined/>} type={`text`} onClick={handleQuery}/>
                <FunctionalResourceForm appCode={appCode} clientType={clientType} onRefresh={handleQuery}><Button type={`primary`}>新建功能资源</Button></FunctionalResourceForm>
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