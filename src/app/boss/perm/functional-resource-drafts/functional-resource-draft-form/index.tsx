import {DrawerForm} from "@trionesdev/antd-react-ext";
import React, {FC, useEffect, useState} from "react";
import {functionalResourceApi} from "@apis";
import {Button, Form, Input, message, Space, Table} from "antd";
import {ClientType} from "@app/boss/perm/internal/perm.enum.ts";
import {MinusCircleOutlined} from "@ant-design/icons";
import _ from "lodash";

type FunctionalResourceDraftProps = {
    children?: React.ReactElement
    id?: string
    parentId?: string
    clientType?: ClientType
    onRefresh?: () => void
}
export const FunctionalResourceDraftForm: FC<FunctionalResourceDraftProps> = ({
                                                                              children,
                                                                              id,
                                                                              clientType,
                                                                              parentId = "0",
                                                                              onRefresh
                                                                          }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [form] = Form.useForm()
    const actions = Form.useWatch('actions', {preserve: true, form})

    const handleQueryById = () => {
        functionalResourceApi.queryFunctionalResourceDraftById(id!).then((data: any) => {
            form.setFieldsValue({
                ...data, actions: _.map(data?.actions, (action: any) => {
                    return {...action, id: `${Math.random()}`}
                })
            })
        }).catch(async (ex: any) => {
            message.error(ex.message)
        })
    }

    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (!id) {
                Object.assign(values, {clientType, parentId})
            }
            const request = id ? functionalResourceApi.updateFunctionalResourceDraftById(id, values) : functionalResourceApi.createFunctionalResourceDraft(values)
            request.then(() => {
                onRefresh?.()
            })
        })
    }

    useEffect(() => {
        if (id && open) {
            handleQueryById()
        }
    }, [id, open]);

    const actionsColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            render: (_text: any, _record: any, index: number) => {
                return <Form.Item noStyle={true} name={['actions', index, 'name']} required={true}
                                  rules={[{required: true, message: ''}]}>
                    <Input/>
                </Form.Item>
            }
        },
        {
            title: '标识',
            dataIndex: 'identifier',
            render: (_text: any, _record: any, index: number) => {
                return <Form.Item noStyle={true} name={['actions', index, 'identifier']} required={true}
                                  rules={[{required: true, message: ''}]}>
                    <Input/>
                </Form.Item>
            }
        },
        {
            dataIndex: 'id',
            render: (_text: any, _record: any, index: number) => {
                return <Space>
                    <Button size={`small`} icon={<MinusCircleOutlined/>} type={`text`} onClick={() => {
                        form.setFieldsValue({actions: actions.filter((_: any, i: number) => i !== index)})
                    }}/>
                </Space>
            }
        }
    ]

    return <DrawerForm open={open} trigger={children} title={`${id ? '修改' : '新建'}功能权限资源`} width={700}
                       form={form}
                       formProps={{layout: 'vertical'}} afterOpenChange={setOpen} onOk={handleSubmit}>
        <Form.Item name={`name`} label={`功能权限资源对象名称`} required={true}>
            <Input placeholder={'请输入功能权限资源对象名称'}/>
        </Form.Item>
        <Form.Item name={`identifier`} label={`功能权限资源对象唯一标识`} required={true}>
            <Input placeholder={`请输入功能权限资源对象唯一标识`}/>
        </Form.Item>
        <Form.Item name={`description`} label={`功能权限资源描述`}>
            <Input placeholder={'请输入功能权限资源描述'}/>
        </Form.Item>
        <Form.Item label={`资源操作`}>
            <div style={{padding: 4}}>
                <Button type={`primary`} onClick={() => {
                    form.setFieldsValue({actions: (actions || []).concat({id: `${Math.random()}`})})
                }}>新增操作</Button>
            </div>
            <Table size={`small`} columns={actionsColumns} dataSource={actions} pagination={false} rowKey={`id`}/>
        </Form.Item>
    </DrawerForm>
}