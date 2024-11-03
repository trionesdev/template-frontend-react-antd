import {DrawerForm} from "@trionesdev/antd-react-ext";
import React, {FC, useState} from "react";
import {Form, Input, message} from "antd";
import _ from "lodash";
import {tenantApi} from "@apis/tenant";

type ChangePasswordFormProps = {
    children?: React.ReactElement
    id?: string
}
export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({children, id}) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values: any) => {
            _.assign(values, {id})
            tenantApi.changePassword(values).then(async () => {
                message.success('修改成功')
                setOpen(false)
            }).catch(async (err: any) => {
                message.error(err.message)
            })
        })
    }

    return <DrawerForm trigger={children} open={open} title={`修改密码`} form={form} formProps={{layout: 'vertical'}}
                       afterOpenChange={(o) => setOpen(o)} onOk={handleSubmit}>
        <Form.Item name={"password"} label={"新密码"} rules={[{required: true}]}><Input.Password/></Form.Item>
    </DrawerForm>
}