import React, {FC, useEffect, useState} from "react";
import {Form, Input, message, Radio} from "antd";
import {useRequest} from "ahooks";
import {tenantApi} from "@apis/tenant";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {DepartmentSelect} from "@app/normal/org/components/department-select";
import {useAppConfig} from "../../../../../commponents/app-config";


type TenantMemberFormProps = {
    children: React.ReactElement,
    id?: string
    departmentId?: string
    onRefresh?: () => void
}

export const TenantMemberForm: FC<TenantMemberFormProps> = ({
                                                                children, id,
                                                                departmentId = "0",
                                                                onRefresh
                                                            }) => {
    const {multiTenant} = useAppConfig()
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const memberAccount = Form.useWatch('memberAccount', {form, preserve: true})

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
        <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}成员`} open={open}
                    onTriggerClick={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    afterOpenChange={(o) => {
                        // setOpen(o)
                        if (!o) {
                            form.resetFields()
                        }
                    }} form={form} onOk={handleSubmit} destroyOnClose formProps={{layout: 'vertical'}}
                    loading={loading}>
            <Form.Item name={`username`} label={`用户名`} required={true}>
                <Input/>
            </Form.Item>
            {!id && <Form.Item name={`password`} label={`密码`} required={true}>
                <Input.Password/>
            </Form.Item>}
            <Form.Item name={`name`} label={`姓名`} required={true}>
                <Input/>
            </Form.Item>
            <Form.Item name={`phone`} label={<span>手机号码</span>} required={!memberAccount}
                       rules={[{required: !memberAccount, message: '手机号码不能为空'}]}>
                <Input/>
            </Form.Item>
            {multiTenant && !id && <Form.Item name={`memberAccount`} label={`成员账号`} initialValue={false}>
                <Radio.Group>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                </Radio.Group>
            </Form.Item>}
            <Form.Item name={`departmentIds`} label={`部门`} required={true} initialValue={[departmentId]}>
                <DepartmentSelect multiple/>
            </Form.Item>
        </DrawerForm>
    )
}