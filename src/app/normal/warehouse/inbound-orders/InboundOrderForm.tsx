import {FC, ReactElement, useEffect, useState} from "react";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {DatePicker, Form, Input, message} from "antd";
import {inboundApi} from "@apis/tenant";
import {useRequest} from "ahooks";

type InboundOrderFormProps = {
    children?: ReactElement
    id?: string
    onRefresh?: () => void
    defaultOpen?: boolean
}
export const InboundOrderForm: FC<InboundOrderFormProps> = ({children, id, onRefresh, defaultOpen = false}) => {
    const [open, setOpen] = useState(defaultOpen)
    const [form] = Form.useForm();

    const {run: handleQueryById, loading} = useRequest(() => {
        return inboundApi.findInboundOrderById(id!)
    }, {
        manual: true,
        onSuccess: (res) => {
            form.setFieldsValue(res)
        }
    })

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const request = id ? inboundApi.updateInboundOrderById(id, values) : inboundApi.createInboundOrder(values)
            request.then(async () => {
                message.success(`提交成功`)
                onRefresh?.()
                setOpen(false)
            })
        })
    }

    useEffect(() => {
        if (open && id) {
            handleQueryById()
        }
    }, [open, id]);

    return <DrawerForm trigger={children} open={open} onTriggerClick={() => setOpen(true)}
                       onClose={() => setOpen(false)}
                       afterOpenChange={(o) => {
                           if (!o) {
                               form.resetFields()
                           }
                       }}
                       form={form}
                       formProps={{layout: 'vertical'}} loading={loading} onOk={handleSubmit}>
        <Form.Item label={`入库单号`} name={`orderNo`}>
            <Input placeholder={'入库单号,不填则根据规则自动生成'}/>
        </Form.Item>
        <Form.Item label={`预收货通知单号(ASN)`} name={`asnNo`}>
            <Input/>
        </Form.Item>
        <Form.Item label={`仓库`} name={`warehouseId`}>
            <Input/>
        </Form.Item>
        <Form.Item label={`入库时间`} name={`inboundTime`}>
            <DatePicker style={{width: '100%'}} showTime/>
        </Form.Item>
    </DrawerForm>
}