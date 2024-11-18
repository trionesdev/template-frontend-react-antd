import React, {FC, useEffect, useState} from "react";
import {Form, Input, message, Spin, Switch} from "antd";
import {useRequest} from "ahooks";
import {warehouseApi} from "@apis/tenant";
import {DrawerForm} from "@trionesdev/antd-react-ext";

type WarehouseFormProps = {
    children: React.ReactElement,
    id?: string
    onRefresh?: () => void
}

export const WarehouseForm: FC<WarehouseFormProps> = ({
                                                                children, id, onRefresh
                                                            }) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()

    const {run: handleQueryById, loading} = useRequest(() => {
        return warehouseApi.queryWarehouseById(id!)
    }, {
        manual: true,
        onSuccess(data) {
            form.setFieldsValue(data)
        },
        onError: async (err) => {
            message.error(err.message)
        }
    })

    const handleSubmit = async () => {
        form.validateFields().then((values) => {
            const request = id ? warehouseApi.updateWarehouseById(id, values) : warehouseApi.createWarehouse(values)
            request.then(() => {
                message.success('保存成功')
                setOpen(false)
                onRefresh?.()
            }).catch((err: any) => {
                message.error(err.message)
            })
        })
    }

    useEffect(() => {
        if (open && id) {
            handleQueryById()
        }
    }, [open, id])

    return (
        <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}仓库`} open={open} afterOpenChange={(o) => {
            setOpen(o)
            if (!o) {
                form.resetFields()
            }
        }} form={form} onOk={handleSubmit}
                    formProps={{layout: 'vertical'}}>
            <Spin spinning={loading}>
                <Form.Item name={`name`} label={`仓库名称`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入仓库名称"}/>
                </Form.Item>
                <Form.Item name={`code`} label={`仓库编码`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入仓库编码"}/>
                </Form.Item>
                <Form.Item name={`address`} label={`仓库地址`} >
                    <Input.TextArea rows={4} placeholder={"请输入仓库地址"}/>
                </Form.Item>
                <Form.Item name={`enabled`} label={`状态`} initialValue={true} >
                    <Switch/>
                </Form.Item>
                <Form.Item name={`remark`} label={`备注`} >
                    <Input.TextArea rows={4} placeholder={"请输入备注"}/>
                </Form.Item>
            </Spin>
        </DrawerForm>
    )
}