import {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {GridTable, Layout, SearchToolbar, TableToolbar} from "@trionesdev/antd-react-ext";
import {Button, FormItemProps, Input, message, Modal, Popconfirm, Space, Switch, Tag} from "antd";
import {ExclamationCircleFilled, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {PageResult} from "@apis";
import {warehouseContainerApi} from "@apis/tenant";
import { WarehouseContainerForm } from "./WarehouseContainerForm.tsx";
import _ from "lodash";
import {WarehouseSelect} from "@app/normal/warehouse/components/warehouse-select";
import {WarehouseContainerStatus} from "@app/normal/warehouse/internal/warehouse.enums.ts";

export const WarehouseContainersPage = () => {
    const [searchParams, setSearchParams] = useState<any>({})
    const [pageParams, setPageParams] = useState({pageNum: 1, pageSize: 10})
    const [result, setResult] = useState<PageResult<any>>({rows: [], total: 0})
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])


    const {run: handleQuery, loading} = useRequest(() => {
        const params = {...pageParams, ...searchParams}
        return warehouseContainerApi.queryPage(params)
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
            title: '托盘编码',
            dataIndex: 'code',
            width: 200,
        },
        {
            title: '托盘名称',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: '所属仓库',
            dataIndex: 'warehouseName',
            width: 200,
        },
        {
            title: '托盘类型',
            dataIndex: 'type',
            width: 200,
        },
        {
            title: '托盘状态',
            dataIndex: 'status',
            width: 100,
            render: (text: string) => (
                text == WarehouseContainerStatus.NORMAL ?
                    <Tag color={`blue`}>正常</Tag> : <Tag color={`red`}>报废</Tag>
            )
        },
        {
            title: '启用',
            dataIndex: 'enabled',
            width: 100,
            render: (text: boolean, record: any) => {
                return <Switch checked={text}
                               onChange={(checked: boolean) => {handleEnable(record.id, checked)}}/>
            }
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 150,
            render: (_id: string, record: any) => {
                return <Space>
                    <WarehouseContainerForm id={record.id} onRefresh={handleQuery}>
                        <Button size={`small`} type={`link`}>编辑</Button>
                    </WarehouseContainerForm>
                    <Popconfirm
                        title={'确认删除记录'}
                        okText={'确定'}
                        cancelText={'取消'}
                        style={{cursor: 'pointer'}}
                        placement={'topRight'}
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button size={`small`} type={'link'}>删除</Button>
                    </Popconfirm>
                </Space>
            }
        }
    ]

    const handleDelete = (id: string) => {
        warehouseContainerApi.deleteByIds([id]).then(async () => {
            message.success(`删除成功`)
            handleQuery()
        }).catch(async (ex) => {
            message.error(ex.message)
        });
    };

    const handleSelectedRowChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys)
    }

    const handleDeleteBatch = async () => {
        if (_.isEmpty(selectedRowKeys)) {
            message.warning('请先选择您需要删除的记录')
            return
        }

        Modal.confirm({
            title: '删除确认',
            icon: <ExclamationCircleFilled/>,
            content: '您确定要删除这些记录吗，删除后将无法恢复。',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                warehouseContainerApi.deleteByIds(selectedRowKeys).then(() => {
                    message.success('删除成功')
                    setSelectedRowKeys([])
                    handleQuery()
                }).catch(ex => {
                    message.error(`${ex.message}`)
                })
            }
        })
    }

    const handleEnable = (id: string, enabled: boolean) => {
        warehouseContainerApi.updateById(id, {enabled: enabled}).then(async () => {
            message.success(enabled ? '启用成功' : '禁用成功')
            handleQuery()
        }).catch(async (ex) => {
            message.error(ex.message)
        });
    }

    const searchFormItems: FormItemProps[] = [
        {label: '托盘编码', name: 'code', children: <Input type={'text'} placeholder={`请输入托盘编码`} />},
        {label: '托盘名称', name: 'name', children: <Input type={'text'} placeholder={`请输入托盘名称`} />},
        {label: '所属仓库', name: 'warehouseId', children: <WarehouseSelect />},
    ]


    return (
        <Layout>
            <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
                <SearchToolbar items={searchFormItems} onSearchParamsChange={(params) => {
                    setSearchParams(params)
                }} onReset={() => setSearchParams({})} onSearch={handleQuery}/>
                <GridTable
                    toolbar={<TableToolbar title={
                        <Space>
                            <WarehouseContainerForm onRefresh={handleQuery}>
                                <Button type={`primary`} icon={<PlusCircleOutlined/>}>添加托盘</Button>
                            </WarehouseContainerForm>
                            <Button type={`primary`} danger icon={<MinusCircleOutlined/>}
                                    onClick={handleDeleteBatch}>删除托盘</Button>
                        </Space>}
                    />}
                    fit={true} size={'small'} columns={columns} dataSource={result?.rows} rowKey={`id`}
                    loading={loading}
                    rowSelection={{
                        fixed: false,
                        selectedRowKeys: selectedRowKeys,
                        preserveSelectedRowKeys: false,
                        onChange: handleSelectedRowChange
                    }}
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