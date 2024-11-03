import React, {FC, useEffect, useState} from "react";
import {Form, Input, message, Spin} from "antd";
import {DepartmentSelect} from "../components/department-select";
import {useRequest} from "ahooks";
import {tenantApi} from "@apis/tenant";
import {DrawerForm} from "@trionesdev/antd-react-ext";

type DepartmentMemberFormProps = {
    children: React.ReactElement,
    id?: string
    departmentId?: string
    onRefresh?: () => void
}

export const DepartmentMemberForm: FC<DepartmentMemberFormProps> = ({
                                                                        children, id,
                                                                        departmentId = "0",
                                                                        onRefresh
                                                                    }) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()

    const {run: handleQueryById, loading} = useRequest(() => {
        return tenantApi.queryTenantMemberById(id!)
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
            const request = id ? tenantApi.updateTenantMemberById(id, values) : tenantApi.createTenantMember(values)
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
        <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}成员`} open={open} afterOpenChange={(o) => {
            setOpen(o)
            if (!o) {
                form.resetFields()
            }
        }} form={form} onOk={handleSubmit}
                    formProps={{layout: 'vertical'}}>
            <Spin spinning={loading}>
                <Form.Item name={`username`} label={`用户名`} required={true}>
                    <Input/>
                </Form.Item>
                {!id && <Form.Item name={`password`} label={`密码`} required={true}>
                    <Input.Password/>
                </Form.Item>}
                <Form.Item name={`nickname`} label={`姓名`} required={true}>
                    <Input/>
                </Form.Item>
                <Form.Item name={`phone`} label={`手机号码`} required={true}>
                    <Input/>
                </Form.Item>
                <Form.Item name={`departmentIds`} label={`部门`} required={true} initialValue={[departmentId]}>
                    <DepartmentSelect multiple/>
                </Form.Item>
            </Spin>
        </DrawerForm>
    )
}