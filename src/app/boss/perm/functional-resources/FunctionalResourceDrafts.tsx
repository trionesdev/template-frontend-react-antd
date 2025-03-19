import {GridTable, TableToolbar} from "@trionesdev/antd-react-ext";
import React, {FC, SyntheticEvent, useState} from "react";
import {ClientType, ResourceType} from "@app/boss/perm/shared/perm.enums.ts";
import {ClientTypeOptions, ResourceTypeOptions} from "@app/boss/perm/shared/perm.options.ts";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis/boss";
import _ from "lodash";
import {Button, Drawer, message, Modal, Popconfirm, Space} from "antd";
import {FunctionalResourceDraftForm} from "@app/boss/perm/functional-resources/FunctionalResourceDraftForm.tsx";
import {BuildOutlined, ImportOutlined, PlusCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {icons} from "@components/icon-select";

type FunctionalResourceDraftsProps = {
    children?: React.ReactElement
    appCode?: string
    clientType?: ClientType,
    onRefresh?: () => void
}

export const FunctionalResourceDrafts: FC<FunctionalResourceDraftsProps> = ({
                                                                                children,
                                                                                appCode,
                                                                                clientType,
                                                                                onRefresh
                                                                            }) => {
    const [open, setOpen] = React.useState(false);
    const [treeData, setTreeData] = useState<any[] | undefined>()
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])

    const {run: handleQuery, loading} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceDraftTree({
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
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 200,
            minWidth: 200,
            fixed: `right`,
            render: (id: string, record: any) => {
                return <Space>
                    <FunctionalResourceDraftForm appCode={appCode} clientType={clientType} id={id}
                                                 onRefresh={handleQuery}>
                        <Button size={`small`} type={`link`}>编辑</Button>
                    </FunctionalResourceDraftForm>
                    <FunctionalResourceDraftForm appCode={appCode} clientType={clientType} parentId={id}
                                                 onRefresh={handleQuery}>
                        <Button disabled={_.eq(record.type, ResourceType.ACTION)} size={`small`}
                                type={`link`}>添加子项</Button>
                    </FunctionalResourceDraftForm>
                    <Popconfirm title={`确定删除该资源？`} onConfirm={() => {
                        functionalResourceApi.deleteFunctionalResourceDraftById(id).then(async () => {
                            message.success(`删除成功`)
                            handleQuery()
                        }).catch(async (err) => {
                            message.error(err)
                        })
                    }}>
                        <Button disabled={!_.isEmpty(record.children)} size={`small`} type={`link`}
                                danger={true}>删除</Button>
                    </Popconfirm>
                </Space>
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
        <Drawer
            title={`功能资源草稿`} onClose={() => {
            setOpen(false);
        }} open={open} width={'100%'} height={'100%'} footer={null}>
            <GridTable
                toolbar={<TableToolbar title={<Space>
                    {ClientTypeOptions.find(item => item.value === clientType)?.label}
                    <Button onClick={handleExpandedAll}>全部展开</Button>
                    <Button onClick={() => {
                        setExpandedRowKeys([])
                    }}>全部收起</Button>
                </Space>} extra={<Space>
                    <FunctionalResourceDraftForm appCode={appCode} clientType={clientType}
                                                 onRefresh={handleQuery}><Button
                        type={`primary`}
                        icon={<PlusCircleOutlined/>}>新建功能资源</Button></FunctionalResourceDraftForm>
                    <Button type={`primary`} icon={<SyncOutlined/>} onClick={() => {
                        Modal.confirm({
                            title: '同步资源',
                            content: '将当前发布的资源同步到草稿，是否继续？',
                            onOk: () => {
                                functionalResourceApi.syncResourceDraftFromRelease({
                                    appCode,
                                    clientType
                                }).then(async () => {
                                    message.success(`同步成功`)
                                    handleQuery()
                                }).catch(async (err) => {
                                    message.error(err)
                                })
                            }
                        })
                    }}>同步资源</Button>
                    <Button icon={<ImportOutlined/>}>导入资源</Button>
                    <Button type={`primary`} icon={<BuildOutlined/>} onClick={() => {
                        Modal.confirm({
                            title: '发布资源',
                            content: '将草稿发布到资源，是否继续？',
                            onOk: () => {
                                functionalResourceApi.releaseFunctionalResourceDrafts({
                                    appCode,
                                    clientType
                                }).then(async () => {
                                    message.success(`发布成功`)
                                    onRefresh?.()
                                }).catch(async (err) => {
                                    message.error(err)
                                })
                            }
                        })
                    }}>发布资源</Button>
                </Space>}/>}
                fit={true}
                size={`small`} columns={columns}
                dataSource={treeData}
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

                scroll={{x: 1000}}
                pagination={false} loading={loading} rowKey={`id`}/>
        </Drawer>
    </>
}