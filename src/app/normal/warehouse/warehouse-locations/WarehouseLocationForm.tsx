import React, {FC, useEffect, useState} from "react";
import {Form, Input, InputNumber, message, Spin, Switch} from "antd";
import {useRequest} from "ahooks";
import {warehouseLocationApi} from "@apis/tenant";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {WarehouseSelect} from "@app/normal/warehouse/components/warehouse-select";
import {WarehouseAreaSelect} from "@app/normal/warehouse/components/warehouse-area-select";

type WarehouseLocationFormProps = {
    children: React.ReactElement,
    id?: string
    onRefresh?: () => void
}

export const WarehouseLocationForm: FC<WarehouseLocationFormProps> = ({
                                                                          children, id, onRefresh
                                                                      }) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const warehouseId = Form.useWatch('warehouseId', form)

    const {run: handleQueryById, loading} = useRequest(() => {
        return warehouseLocationApi.queryById(id!)
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
            const request = id ? warehouseLocationApi.updateById(id, values) : warehouseLocationApi.create(values)
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
        <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}库位`} open={open} afterOpenChange={(o) => {
            setOpen(o)
            if (!o) {
                form.resetFields()
            }
        }} form={form} onOk={handleSubmit}
                    formProps={{layout: 'vertical'}}>
            <Spin spinning={loading}>
                <Form.Item name={`name`} label={`库位名称`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入库位名称"}/>
                </Form.Item>
                <Form.Item name={`code`} label={`库位编码`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入库位编码"}/>
                </Form.Item>
                <Form.Item name={`warehouseId`} label={`所属仓库`} rules={[{required: true}]} required={true}>
                    <WarehouseSelect onChange={(value)=> {
                        form.setFieldValue('warehouseId', value)
                        form.setFieldValue('warehouseAreaId', null)
                    }} />
                </Form.Item>
                <Form.Item name={`warehouseAreaId`} label={`所属库区`}
                           rules={[{required: true}]} required={true}>
                    <WarehouseAreaSelect warehouseId={warehouseId}/>
                </Form.Item>
                <Form.Item name={`floorQuantity`} label={`层数`}>
                    <InputNumber placeholder={"请输入层数"} />
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