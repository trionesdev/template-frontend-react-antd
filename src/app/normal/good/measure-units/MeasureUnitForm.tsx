import React, {FC, useEffect, useState} from "react";
import {Form, Input, message, Spin, Switch} from "antd";
import {useRequest} from "ahooks";
import {measureUnitApi} from "@apis/tenant";
import {DrawerForm} from "@trionesdev/antd-react-ext";

type MeasureUnitFormProps = {
    children: React.ReactElement,
    id?: string
    onRefresh?: () => void
}

export const MeasureUnitForm: FC<MeasureUnitFormProps> = ({
                                                                children, id, onRefresh
                                                            }) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()

    const {run: handleQueryById, loading} = useRequest(() => {
        return measureUnitApi.queryById(id!)
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
            const request = id ? measureUnitApi.updateById(id, values) : measureUnitApi.create(values)
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
        <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}单位`} open={open} afterOpenChange={(o) => {
            setOpen(o)
            if (!o) {
                form.resetFields()
            }
        }} form={form} onOk={handleSubmit}
                    formProps={{layout: 'vertical'}}>
            <Spin spinning={loading}>
                <Form.Item name={`name`} label={`单位名称`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入单位名称"}/>
                </Form.Item>
                <Form.Item name={`code`} label={`单位编码`} rules={[{required: true}]} required={true}>
                    <Input placeholder={"请输入单位编码"}/>
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