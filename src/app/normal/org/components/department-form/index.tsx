import React, {FC, useEffect, useState} from "react";
import {Form, Input, message, Spin} from "antd";
import {DepartmentSelect} from "../department-select";
import {departmentApi} from "@apis/tenant";
import {useRequest} from "ahooks";
import {ModalForm} from "@trionesdev/antd-react-ext";

type DepartmentFormProps = {
    children: React.ReactElement,
    id?: string
    parentId?: string
    onRefresh?: () => void
}
export const DepartmentForm: FC<DepartmentFormProps> = ({children, id, parentId, onRefresh}) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm();

    const {run: handleQueryById, loading} = useRequest(() => {
        return departmentApi.queryDepartmentById(id!)
    }, {
        manual: true,
        onSuccess: (res: any) => {
            form.setFieldsValue(res)
        },
        onError: async (e) => {
            message.error(e.message)
        }
    })

    const onSubmit = () => {
        form.validateFields().then(values => {
            const request = id ? departmentApi.updateDepartmentById(id, values) : departmentApi.createDepartment(values)
            request.then(() => {
                setOpen(false)
                onRefresh?.()
            }).catch(async (res: any) => {
                message.error(res.message)
            })
        })
    }

    useEffect(() => {
        if (open && id) {
            if (id) {
                handleQueryById()
            }
            if (parentId) {
                form.setFieldsValue({parentId})
            }
        }
    }, [open, id, parentId]);


    return <ModalForm trigger={children} title={`${id ? '修改' : '新建'}部门`} form={form} open={open}
                      onTriggerClick={() => setOpen(true)}
                      onClose={() => setOpen(false)}
                      onCancel={() => setOpen(false)}
                      afterOpenChange={(o) => {
                          if (!o) {
                              form.resetFields()
                          }
                      }} onOk={onSubmit} formProps={{layout: 'vertical'}}>
        <Spin spinning={loading}>
            <Form.Item name={`parentId`} label={`上级部门`} initialValue={parentId || "0"}>
                <DepartmentSelect/>
            </Form.Item>
            <Form.Item name={`name`} label={`名称`}>
                <Input/>
            </Form.Item>
        </Spin>
    </ModalForm>
}