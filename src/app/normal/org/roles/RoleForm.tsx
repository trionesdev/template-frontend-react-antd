import React, {FC, useEffect, useState} from "react";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {Form, Input, message} from "antd";
import {roleApi} from "@apis";

type RoleFormProps = {
    children: React.ReactElement,
    id?: string
    onRefresh?: () => void
}
export const RoleForm: FC<RoleFormProps> = ({children, id, onRefresh}) => {
    const [open, setOpen] = useState<any>(false)
    const [form] = Form.useForm();

    const handleQueryRole = () => {
        if (id) {
            roleApi.queryRoleById(id).then(res => {
                form.setFieldsValue(res)
            })
        }
    }

    const handleSubmit = () => {
        form.validateFields().then(values => {
            const request = id ? roleApi.updateRoleById(id, values) : roleApi.createRole(values)
            request.then(async () => {
                onRefresh?.()
                setOpen(false)
                message.success(`${id ? '修改' : '新增'}角色成功`)
            }).catch(async (ex) => {
                message.error(ex.message)
            })
        })
    }

    useEffect(() => {
        if (open && id) {
            handleQueryRole()
        }
    }, [id, open])

    return <DrawerForm open={open} form={form} trigger={children} title={`${id ? '修改' : '新增'}角色`}
                       formProps={{layout: 'vertical'}} onOk={handleSubmit}
                       afterOpenChange={(o) => {
                           setOpen(o)
                           form.resetFields()
                       }}>
        <Form.Item label={`角色名称`} name={`name`} required={true}>
            <Input/>
        </Form.Item>
    </DrawerForm>
}