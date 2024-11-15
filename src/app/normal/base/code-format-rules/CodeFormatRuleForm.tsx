import {ModalForm} from "@trionesdev/antd-react-ext";
import React, {FC, useEffect, useState} from "react";
import {Form, Input, InputNumber, message, Select} from "antd";
import {TimeFormatTypeOptions} from "@app/normal/base/internal/base.options.ts";
import {codeFormatRuleApi} from "@apis/tenant";
import {TimeFormatType} from "@app/normal/base/internal/base.enums.ts";

type CodeFormatRuleFormProps = {
    children: React.ReactElement,
    id?: string
    onRefresh?: () => void
}
export const CodeFormatRuleForm: FC<CodeFormatRuleFormProps> = ({
                                                                    children, id, onRefresh
                                                                }) => {
    const [open, setOpen] = useState(false)

    const [form] = Form.useForm()
    const handleSubmit = () => {
        form.validateFields().then(values => {
            const request = id ? codeFormatRuleApi.updateCodeFormatRuleById(id, values) : codeFormatRuleApi.createCodeFormatRule(values)
            request.then(async () => {
                message.success('保存成功')
                setOpen(false)
                onRefresh?.()
            }).catch(async (ex: any) => {
                message.error(ex.message)
            })
        })
    }

    const handleQueryById = () => {
        codeFormatRuleApi.queryCodeFormatRuleById(id!).then((res: any) => {
            form.setFieldsValue(res)
        })
    }

    useEffect(() => {
        if (open && id) {
            handleQueryById()
        }
    }, [open, id]);


    return <ModalForm open={open} trigger={children} title={`${id ? '编辑' : '新建'}编码规则`} form={form}
                      formProps={{labelAlign: 'left', labelCol: {flex: '100px'}}} afterOpenChange={o => {
        setOpen(o)
        if (!o) {
            form.resetFields()
        }
    }} onOk={handleSubmit}>
        <Form.Item label={`名称`} name={`name`} required={true} rules={[{required: true, message: '请输入名称'}]}>
            <Input placeholder={`请输入名称`}/>
        </Form.Item>
        <Form.Item label={`标识`} name={`identifier`} required={true} rules={[{required: true, message: '请输入标识'}]}>
            <Input placeholder={`请输入规则标识`}/>
        </Form.Item>
        <Form.Item label={`前缀`} name={`prefix`} required={true} rules={[{required: true, message: '请输入前缀'}, {
            pattern: /^[A-Z_]+$/,
            message: '请输入大写字母或者_'
        }]}>
            <Input placeholder={'请输入前缀，只能是大写字母或者_'}/>
        </Form.Item>
        <Form.Item label={`时间格式`} name={`timeFormatType`} initialValue={TimeFormatType.YYYY} required={true}
                   rules={[{required: true, message: '请选择时间格式'}]}>
            <Select options={TimeFormatTypeOptions}/>
        </Form.Item>
        <Form.Item label={`序号位数`} name={`serialNumberDigits`} initialValue={1} required={true}
                   rules={[{required: true, message: '请输入序号位数'}]}>
            <InputNumber min={1} max={12}/>
        </Form.Item>
        <Form.Item label={`规则描述`} name={`description`}>
            <Input.TextArea autoSize={{minRows: 1, maxRows: 3}}/>
        </Form.Item>
    </ModalForm>
}