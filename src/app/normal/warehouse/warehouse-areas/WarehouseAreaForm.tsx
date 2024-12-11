import React, {FC, useEffect, useState} from "react";
import {Form, Input, message, Spin, Switch} from "antd";
import {useRequest} from "ahooks";
import {warehouseAreaApi} from "@apis/tenant";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {WarehouseSelect} from "@app/normal/warehouse/components/warehouse-select";

type WarehouseAreaFormProps = {
    children: React.ReactElement,
    id?: string
    onRefresh?: () => void
}

export const WarehouseAreaForm: FC<WarehouseAreaFormProps> = ({
                                                                  children, id, onRefresh
                                                              }) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()

    const {run: handleQueryById, loading} = useRequest(() => {
        return warehouseAreaApi.queryById(id!)
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
            const request = id ? warehouseAreaApi.updateById(id, values) : warehouseAreaApi.create(values)
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
        <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}库区`} open={open}
                    onTriggerClick={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    afterOpenChange={(o) => {
                        if (!o) {
                            form.resetFields()
                        }
                    }} form={form} onOk={handleSubmit}
                    formProps={{layout: 'vertical'}}>
            <Spin spinning={loading}>
                <Form.Item name={`name`} label={`库区名称`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入库区名称"}/>
                </Form.Item>
                <Form.Item name={`code`} label={`库区编码`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入库区编码"}/>
                </Form.Item>
                <Form.Item name={`warehouseId`} label={`所属仓库`}>
                    <WarehouseSelect/>
                </Form.Item>
                <Form.Item name={`enabled`} label={`启用`} initialValue={true}>
                    <Switch/>
                </Form.Item>
                <Form.Item name={`remark`} label={`备注`}>
                    <Input.TextArea rows={4} placeholder={"请输入备注"}/>
                </Form.Item>
            </Spin>
        </DrawerForm>
    )
}