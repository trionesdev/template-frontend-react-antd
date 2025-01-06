import {FC, ReactElement, useEffect, useState} from "react";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {Form, Input, message, Select} from "antd";
import {DictionaryTypeOptions} from "@app/boss/dic/internal/dic.options.ts";
import _ from "lodash";
import {DictionaryType} from "@app/boss/dic/internal/dic.enums.ts";
import {DictionaryTypeSelect} from "@app/boss/dic/dictionaries/DictionaryTypeSelect.tsx";
import {useRequest} from "ahooks";
import {dictionaryApi} from "@apis/boss";

type DictionaryFormProps = {
    children?: ReactElement
    defaultType?: DictionaryType
    defaultTypeCode?: string
    id?: string
    onRefresh?: () => void
}

export const DictionaryForm: FC<DictionaryFormProps> = ({children, defaultType, defaultTypeCode, id, onRefresh}) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm();
    const type = Form.useWatch('type', form) || defaultType;

    const {run: handleQueryById} = useRequest(() => {
        return dictionaryApi.queryDictionaryById(id)
    }, {
        manual: true,
        onSuccess: (res: any) => {
            form.setFieldsValue(res)
        }
    })

    const handleSubmit = () => {
        form.validateFields().then((values: any) => {
            const request = id ? dictionaryApi.updateDictionaryById(id, values) : dictionaryApi.createDictionary(values)
            request.then(async () => {
                message.success(id ? '编辑成功' : '创建成功')
                onRefresh?.()
                setOpen(false)
            }).catch(async (ex: any) => {
                message.error(ex.message)
            })
        })
    }

    useEffect(() => {
        if (open && id) {
            handleQueryById()
        }
    }, [id, open]);

    return <DrawerForm open={open} trigger={children}
                       onTriggerClick={() => setOpen(true)}
                       onCancel={() => setOpen(false)}
                       onClose={() => setOpen(false)}
                       title={`${id ? '编辑' : '新建'}字典`} form={form}
                       formProps={{layout: 'vertical'}} afterOpenChange={setOpen} onOk={handleSubmit}>
        <Form.Item label={`字典类型`} name={`type`} required={true} initialValue={defaultType}>
            <Select options={DictionaryTypeOptions}/>
        </Form.Item>
        {_.eq(type, DictionaryType.DICTIONARY) &&
            <Form.Item label={`类型`} name={`typeCode`} required={true} initialValue={defaultTypeCode}>
                <DictionaryTypeSelect/>
            </Form.Item>}
        <Form.Item label={`名称`} name={`name`} required={true}>
            <Input/>
        </Form.Item>
        <Form.Item label={`编码`} name={`code`} required={true}>
            <Input/>
        </Form.Item>
    </DrawerForm>
}