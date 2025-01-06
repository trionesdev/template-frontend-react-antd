import React, {FC, useEffect, useState} from "react";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {Form, Input} from "antd";
import {useRequest} from "ahooks";
import {districtApi} from "@apis/boss";

type DistrictFormProps = {
    children?: React.ReactElement
    id?: string
}
export const DistrictForm: FC<DistrictFormProps> = ({children, id}) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const {run: handleQuery} = useRequest(() => {
        return districtApi.queryDistrictById(id!)
    }, {
        manual: true,
        onSuccess: (res: any) => {
            if (res) {
                form.setFieldsValue(res)
            }
        }
    })

    useEffect(() => {
        if (open && id) {
            handleQuery()
        }
    }, [id, open])

    return <DrawerForm title={`${id ? '编辑' : '新建'}地区数据`} trigger={children}
                       onTriggerClick={() => setOpen(true)}
                       onCancel={() => setOpen(false)}
                       onClose={() => setOpen(false)}
                       open={open} form={form}
                       formProps={{labelCol: {flex: '70px'}}} afterOpenChange={setOpen}>
        <Form.Item label={`名称`} name={`name`}>
            <Input disabled={true}/>
        </Form.Item>
        <Form.Item label={`地区编码`} name={`code`}>
            <Input/>
        </Form.Item>
        <Form.Item label={`城市码`} name={`cityCode`}>
            <Input/>
        </Form.Item>
    </DrawerForm>
}