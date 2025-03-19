import {GridTable, TableToolbar} from "@trionesdev/antd-react-ext";
import React, {FC, SyntheticEvent, useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis/boss";
import {AppOptions, ClientTypeOptions, ResourceTypeOptions} from "@app/boss/perm/shared/perm.options.ts";
import {Button, Checkbox, Drawer, message, Modal, Select, Space} from "antd";
import _ from "lodash";
import {icons} from "@components/icon-select";
import {App, ClientType, PermissionSubjectType} from "@app/boss/perm/shared/perm.enums.ts";
import {policyApi} from "@apis/tenant";
import {RedoOutlined, SaveOutlined} from "@ant-design/icons";
import {useAppConfig} from "@components/app-config";

type RolePermissionSettingsProps = {
    children?: React.ReactElement
    roleId: string,
    editable?: boolean
}

export const RolePermissionSettings: FC<RolePermissionSettingsProps> = ({children, roleId, editable = true}) => {
    const appConfig = useAppConfig()
    const [open, setOpen] = useState(false)
    const [appCode, setAppCode] = useState(App.TENANT)
    const [clientType, setClientType] = useState(ClientType.PC_WEB)
    const [treeData, setTreeData] = useState<any[] | undefined>()
    const [resourceCodes, setResourceCodes] = useState<any>([])
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])

    const {run: handleQuery, loading} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceTree({})
    }, {
        manual: true,
        onSuccess: (res: any) => {
            if (res) {
                setTreeData(res || [])
                handleExpandedAll()
            }
        }
    })

    const {run: handleQueryRolePermissions} = useRequest(() => {
        return policyApi.queryPermissionsBySubject({
            appCode,
            clientType,
            subjectType: PermissionSubjectType.ROLE, subject: roleId})
    }, {
        manual: true,
        onSuccess: (res: any) => {
            if (res) {
                setResourceCodes(_.map(res, (item: any) => item.resourceCode))
            }
        }
    })

    const handleSubmit = () => {
        const permissions = _.map(resourceCodes, (resourceCode: any) => {
            return {resourceCode}
        })
        policyApi.savePolicy({
            appCode,
            clientType,
            subjectType: PermissionSubjectType.ROLE,
            subject: roleId,
            permissions: permissions
        }).then(async () => {
            message.success('保存成功')
        }).catch(async (err: any) => {
            message.error(err.message)
        })
    }

    const handleCollectResourceCodes = () => {
        function collectResourceCodes(data: any[] | undefined): string[] {
            if (_.isEmpty(data)) {
                return []
            }
            const resourceCodes: string[] = []
            _.forEach(data, (item: any) => {
                resourceCodes.push(item.uniqueCode)
                if (_.isArray(item.children) && !_.isEmpty(item.children)) {
                    const childrenResourceCodes = collectResourceCodes(item.children as any[])
                    resourceCodes.push(...childrenResourceCodes)
                }
            })
            return resourceCodes
        }

        return collectResourceCodes(treeData)
    }

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

    useEffect(() => {
        if (open) {
            handleQuery()
        }
    }, [open]);

    useEffect(() => {
        if (open && roleId) {
            handleQueryRolePermissions()
        }
    }, [roleId, open]);

    const columns = [
        {
            title: '类型',
            dataIndex: 'type',
            width: 200,
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
            width: 250
        },
        {
            title: '图标',
            dataIndex: 'icon',
            width: 50,
            render: (icon: string) => {
                return <>{_.get(icons, icon)}</>
            }
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: <Checkbox onChange={(e) => {
                if (e.target.checked) {
                    setResourceCodes(handleCollectResourceCodes())
                } else {
                    setResourceCodes([])
                }
            }} disabled={!editable}/>,
            dataIndex: 'action',
            width: 80,
            render: (_: any, record: { uniqueCode: any; }) => {
                return <Checkbox disabled={!editable} checked={resourceCodes?.includes(record.uniqueCode)}
                                 onChange={(e) => {
                                     if (e.target.checked) {
                                         if (!resourceCodes?.includes(record.uniqueCode)) {
                                             setResourceCodes([[], ...resourceCodes, record.uniqueCode])
                                         }
                                     } else {
                                         setResourceCodes(resourceCodes.filter((item: any) => item !== record.uniqueCode))
                                     }
                                 }}/>
            }
        }
    ]


    return <>
        {children &&
            React.cloneElement(children, {
                ...children.props,
                onClick: (e?: SyntheticEvent) => {
                    setOpen(true)
                    children.props.onClick?.(e);
                },
            })}
        <Drawer title="权限配置" open={open} width={1000} onClose={() => setOpen(false)}>
            <GridTable
                toolbar={<TableToolbar title={<Space>
                    {appConfig.multiTenant && <Select style={{width: 120}} options={AppOptions} onChange={(value) => {
                        setAppCode(value)
                    }}/>}
                    {_.size(ClientTypeOptions) > 1 && <Select style={{width: 120}} options={ClientTypeOptions} onChange={(value) => {
                        setClientType(value)
                    }}/>}
                    <Button onClick={handleExpandedAll}>全部展开</Button>
                    <Button onClick={() => {
                        setExpandedRowKeys([])
                    }}>全部收起</Button>
                </Space>} extra={<Space>
                    <Button type={`text`} icon={<RedoOutlined/>} onClick={() => {
                        handleQuery()
                        handleQueryRolePermissions()
                    }}/>
                    <Button type={`primary`} icon={<SaveOutlined/>} onClick={() => {
                        Modal.confirm({
                            title: '保存权限',
                            content: '保存权限后，将覆盖当前角色的权限，是否继续？',
                            onOk: () => {
                                handleSubmit()
                            }
                        })
                    }}>保存</Button>
                </Space>}/>}
                fit={true} size={`small`} columns={columns} dataSource={treeData} rowKey={`id`} loading={loading}
                pagination={false}
                expandable={{
                    defaultExpandAllRows: true,
                    defaultExpandedRowKeys: ["0"],
                    expandedRowKeys,
                    onExpand: (expanded, record) => {
                        if (expanded) {
                            setExpandedRowKeys([...expandedRowKeys, record.id])
                        } else {
                            setExpandedRowKeys(expandedRowKeys.filter(item => item !== record.id))
                        }
                    }
                }}
            />
        </Drawer>
    </>
}