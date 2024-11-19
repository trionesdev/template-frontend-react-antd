import React, {FC, useEffect, useState} from "react";
import {Form, Input, message, Spin, Switch} from "antd";
import {useRequest} from "ahooks";
import {supplierApi} from "@apis/tenant";
import {DrawerForm} from "@trionesdev/antd-react-ext";

type WarehouseFormProps = {
    children: React.ReactElement,
    id?: string
    onRefresh?: () => void
}

export const SupplierForm: FC<WarehouseFormProps> = ({
                                                                children, id, onRefresh
                                                            }) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()

    const {run: handleQueryById, loading} = useRequest(() => {
        return supplierApi.queryById(id!)
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
            const request = id ? supplierApi.updateById(id, values) : supplierApi.create(values)
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
        <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}供应商`} open={open} afterOpenChange={(o) => {
            setOpen(o)
            if (!o) {
                form.resetFields()
            }
        }} form={form} onOk={handleSubmit}
                    formProps={{layout: 'vertical'}}>
            <Spin spinning={loading}>
                <Form.Item name={`name`} label={`供应商名称`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入供应商名称"}/>
                </Form.Item>
                <Form.Item name={`code`} label={`供应商编码`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入供应商编码"}/>
                </Form.Item>
                <Form.Item name={`contactName`} label={`联系人`} >
                    <Input placeholder={"请输入联系人"}/>
                </Form.Item>
                <Form.Item name={`contactPhone`} label={`手机号`}  rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }]}>
                    <Input placeholder={"请输入手机号"}/>
                </Form.Item>
                <Form.Item name={`contactFixedTelephone`} label={`固定电话`} rules={[{ pattern: /^\d{3,4}-\d{7,8}$/, message: '请输入有效的固定电话' }]}>
                    <Input placeholder={"请输入固定电话"}/>
                </Form.Item>
                <Form.Item name={`contactEmail`} label={`电子邮箱`} rules={[{ type: 'email', message: '请输入有效的电子邮箱' }]}>
                    <Input placeholder={"请输入电子邮箱"}/>
                </Form.Item>
                <Form.Item name={`contactAddress`} label={`地址`} >
                    <Input.TextArea rows={4} placeholder={"请输入地址"}/>
                </Form.Item>
                <Form.Item name={`enabled`} label={`启用`} initialValue={true} >
                    <Switch/>
                </Form.Item>
                <Form.Item name={`remark`} label={`备注`} >
                    <Input.TextArea rows={4} placeholder={"请输入备注"}/>
                </Form.Item>
            </Spin>
        </DrawerForm>
    )
}