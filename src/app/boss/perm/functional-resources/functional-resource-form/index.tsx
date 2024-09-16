import {DrawerForm} from "@trionesdev/antd-react-ext";
import React, {FC} from "react";
import {functionalResourceApi} from "../../../../../apis/boss";
import {Form, Input} from "antd";
import {ClientType} from "@app/boss/perm/internal/perm.enum.ts";
import {Actions} from "@app/boss/perm/functional-resources/functional-resource-form/Actions.tsx";

type FunctionalResourceDrawerProps = {
    children?: React.ReactElement
    id?: string
    parentId?: string
    clientType?: ClientType
    onRefresh?: () => void
}
export const FunctionalResourceForm: FC<FunctionalResourceDrawerProps> = ({
                                                                              children,
                                                                              id,
                                                                              clientType,
                                                                              parentId = "0",
                                                                              onRefresh
                                                                          }) => {
    const [form] = Form.useForm()
    const handleSubmit = () => {
        form.validateFields().then(values => {
            if (!id) {
                Object.assign(values, {clientType, parentId})
            }
            const request = id ? functionalResourceApi.updateFunctionalResourceDraftById(id, values) : functionalResourceApi.createFunctionalResourceDraft(values)
            request.then(() => {
                onRefresh?.()
            })
        })
    }

    return <DrawerForm trigger={children} title={`${id ? '修改' : '新建'}功能权限资源`} width={700} form={form}
                       formProps={{layout: 'vertical'}} onOk={handleSubmit}>
        <Form.Item name={`name`} label={`功能权限资源对象名称`} required={true}>
            <Input placeholder={'请输入功能权限资源对象名称'}/>
        </Form.Item>
        <Form.Item name={`identifier`} label={`功能权限资源对象唯一标识`} required={true}>
            <Input placeholder={`请输入功能权限资源对象唯一标识`}/>
        </Form.Item>
        <Form.Item name={`description`} label={`功能权限资源描述`}>
            <Input placeholder={'请输入功能权限资源描述'}/>
        </Form.Item>
        <Form.Item name={`actions`} label={`资源操作`}>
            <Actions/>
        </Form.Item>
    </DrawerForm>
}