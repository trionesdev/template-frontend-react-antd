import {DrawerForm} from "@trionesdev/antd-react-ext";
import React, {FC} from "react";
import {Form, Input, Radio} from "antd";
import {ResourceTypeOptions} from "@app/boss/perm/internal/perm.options.ts";

type FunctionalResourceFormProps = {
    children?: React.ReactElement
    id?: string
}
export const FunctionalResourceForm: FC<FunctionalResourceFormProps> = ({
                                                                            children,
                                                                            id
                                                                        }) => {
    return <DrawerForm trigger={children} title={`${id ? '编辑' : '新建'}功能权限资源`} formProps={{layout: 'vertical'}}>
        <Form.Item name={`上级资源`}></Form.Item>
        <Form.Item label={`名称`} name={`name`}>
            <Input placeholder={`请输入名称`}/>
        </Form.Item>
        <Form.Item label={`标识编码`} name={`uniqueCode`} required={true}>
            <Input placeholder={`请输入标识编码`}/>
        </Form.Item>
        <Form.Item label={`类型`} name={`type`}>
            <Radio.Group options={ResourceTypeOptions}/>
        </Form.Item>
        <Form.Item label={`Icon`} name={`icon`}>
            <Input placeholder={`请输入URL`}/>
        </Form.Item>
        <Form.Item label={`描述`} name={`description`}>
            <Input.TextArea placeholder={`请输入描述`}/>
        </Form.Item>
    </DrawerForm>
}