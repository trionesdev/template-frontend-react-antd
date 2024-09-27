import {DrawerForm} from "@trionesdev/antd-react-ext";
import React, {FC, useEffect, useState} from "react";
import {Form, Input, message, Radio} from "antd";
import {ResourceTypeOptions} from "@app/boss/perm/internal/perm.options.ts";
import {FunctionalResourceSelect} from "@app/boss/perm/functional-resources/FunctionalResourceSelect.tsx";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis/boss";
import {ClientType, ResourceType} from "@app/boss/perm/internal/perm.enums.ts";
import _ from "lodash";
import IconSelect from "../../../../commponents/icon-select";

type FunctionalResourceFormProps = {
    children?: React.ReactElement
    appCode?: string
    clientType?: ClientType
    id?: string
    parentId?: string
    onRefresh?: () => void
}
export const FunctionalResourceForm: FC<FunctionalResourceFormProps> = ({
                                                                            children,
                                                                            appCode,
                                                                            clientType,
                                                                            id,
                                                                            parentId = "0",
                                                                            onRefresh
                                                                        }) => {
    const [open, setOpen] = useState(false)
    const [parentResource, setParentResource] = useState<any | undefined>()
    const [form] = Form.useForm()
    const formParentId = Form.useWatch('parentId', form) || parentId
    const type = Form.useWatch('type', form)

    const {run: handleQueryParentResource} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceById(formParentId).then(res => {
            setParentResource(res)
        })
    }, {manual: true})

    const {run: handleQueryResource} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceById(id!).then(res => {
            form.setFieldsValue(res)
        })
    }, {manual: true})

    const handleSubmit = () => {
        form.validateFields().then((values: any) => {
            if (!id) {
                Object.assign(values, {appCode, clientType})
            }
            const request = id ? functionalResourceApi.updateFunctionalResourceById(id, values) : functionalResourceApi.createFunctionalResource(values)
            request.then(async () => {
                message.success(`提交成功`)
                onRefresh?.()
                setOpen(false)
            }).catch(async (ex: any) => {
                message.error(ex.message)
            })
        })
    }

    useEffect(() => {
        if (open && id) {
            handleQueryResource()
        }
    }, [id, open]);

    useEffect(() => {
        if (open) {
            if (formParentId && formParentId !== "0") {
                handleQueryParentResource()
            } else {
                setParentResource(undefined)
            }
        }
    }, [formParentId, open]);

    return <DrawerForm open={open} form={form} trigger={children} title={`${id ? '编辑' : '新建'}功能权限资源`}
                       size={`large`}
                       formProps={{layout: 'horizontal', labelCol: {flex: '100px'}}}
                       afterOpenChange={open => {
                           setOpen(open)
                           if (!open) {
                               form.resetFields()
                           }
                       }} onOk={handleSubmit}>
        <Form.Item label={`上级资源`} name={`parentId`} initialValue={parentId}>
            <FunctionalResourceSelect
                valueOption={parentResource}/>
        </Form.Item>
        <Form.Item label={`名称`} name={`name`}>
            <Input placeholder={`请输入名称`} allowClear/>
        </Form.Item>
        <Form.Item label={`标识编码`} name={`uniqueCode`} required={true}>
            <Input placeholder={`请输入标识编码`}/>
        </Form.Item>
        <Form.Item label={`类型`} name={`type`} required={true}>
            <Radio.Group options={ResourceTypeOptions.filter(item => {
                if (!parentResource) {
                    return true
                } else {
                    if (parentResource.type === ResourceType.GROUP) {
                        return item.value != ResourceType.GROUP
                    } else if (parentResource.type === ResourceType.MENU) {
                        return _.includes([ResourceType.MENU, ResourceType.RESOURCE, ResourceType.ACTION], item.value)
                    } else if (parentResource.type === ResourceType.RESOURCE) {
                        return _.includes([ResourceType.RESOURCE, ResourceType.ACTION], item.value)
                    } else if (parentResource.type === ResourceType.ACTION) {
                        return _.includes([ResourceType.ACTION], item.value)
                    } else {
                        return false
                    }
                }
            })}/>
        </Form.Item>
        {type === ResourceType.MENU && <Form.Item label={`Icon`} name={`icon`}>
            <IconSelect/>
        </Form.Item>}
        {type === ResourceType.MENU && <Form.Item label={`路由`} name={`routePath`}>
            <Input placeholder={`路由`}/>
        </Form.Item>}
        <Form.Item label={`描述`} name={`description`}>
            <Input.TextArea placeholder={`请输入描述`}/>
        </Form.Item>
    </DrawerForm>
}