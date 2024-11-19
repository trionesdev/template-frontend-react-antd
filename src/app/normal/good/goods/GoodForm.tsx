import React, {FC, useEffect, useState} from "react";
import {Form, Input, InputNumber, message, Spin, Switch} from "antd";
import {useRequest} from "ahooks";
import {goodApi} from "@apis/tenant";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {MeasureUnitSelect} from "@app/normal/good/goods/MeasureUnitSelect.tsx";

type WarehouseFormProps = {
    children: React.ReactElement,
    id?: string
    onRefresh?: () => void
}

export const GoodForm: FC<WarehouseFormProps> = ({
                                                                children, id, onRefresh
                                                            }) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()

    const {run: handleQueryById, loading} = useRequest(() => {
        return goodApi.queryById(id!)
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
            const request = id ? goodApi.updateById(id, values) : goodApi.create(values)
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
        <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}货物`} open={open} afterOpenChange={(o) => {
            setOpen(o)
            if (!o) {
                form.resetFields()
            }
        }} form={form} onOk={handleSubmit}
                    formProps={{layout: 'vertical'}}>
            <Spin spinning={loading}>
                <Form.Item name={`name`} label={`货物名称`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入货物名称"}/>
                </Form.Item>
                <Form.Item name={`code`} label={`货物编码`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入货物编码"}/>
                </Form.Item>
                <Form.Item name={`unitCode`} label={`单位`} rules={[{required: true}]} required={true}>
                    <MeasureUnitSelect />
                </Form.Item>
                <Form.Item name={`specification`} label={`规格`} >
                    <Input placeholder={"请输入规格"}/>
                </Form.Item>
                <Form.Item name={`mode`} label={`型号`} >
                    <Input placeholder={"请输入型号"}/>
                </Form.Item>
                <Form.Item name={`weight`} label={`重量(kg)`} >
                    <InputNumber placeholder={"请输入重量(kg)"}/>
                </Form.Item>
                <Form.Item name={`volume`} label={`体积(m²)`} >
                    <InputNumber placeholder={"请输入体积(m²)"}/>
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