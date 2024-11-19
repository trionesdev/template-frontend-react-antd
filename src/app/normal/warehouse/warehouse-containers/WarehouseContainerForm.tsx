import React, {FC, useEffect, useState} from "react";
import {Form, Input, message, Select, Spin, Switch} from "antd";
import {useRequest} from "ahooks";
import {warehouseContainerApi} from "@apis/tenant";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {WarehouseSelect} from "@app/normal/warehouse/components/warehouse-select";
import {WarehouseContainerStatusOptions} from "@app/normal/warehouse/internal/warehouse.options.ts";

type WarehouseContainerFormProps = {
    children: React.ReactElement,
    id?: string
    onRefresh?: () => void
}

export const WarehouseContainerForm: FC<WarehouseContainerFormProps> = ({
                                                                children, id, onRefresh
                                                            }) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()

    const {run: handleQueryById, loading} = useRequest(() => {
        return warehouseContainerApi.queryById(id!)
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
            const request = id ? warehouseContainerApi.updateById(id, values) : warehouseContainerApi.create(values)
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
        <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}托盘`} open={open} afterOpenChange={(o) => {
            setOpen(o)
            if (!o) {
                form.resetFields()
            }
        }} form={form} onOk={handleSubmit}
                    formProps={{layout: 'vertical'}}>
            <Spin spinning={loading}>
                <Form.Item name={`name`} label={`托盘名称`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入托盘名称"}/>
                </Form.Item>
                <Form.Item name={`code`} label={`托盘编码`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入托盘编码"}/>
                </Form.Item>
                <Form.Item name={`warehouseId`} label={`所属仓库`} >
                    <WarehouseSelect />
                </Form.Item>
                <Form.Item name={`type`} label={`托盘类型`} >
                    <Input placeholder={"请输入托盘类型"}/>
                </Form.Item>
                <Form.Item name={`status`} label={`托盘状态`} >
                    <Select options={WarehouseContainerStatusOptions} placeholder={"请选择托盘状态"}/>
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