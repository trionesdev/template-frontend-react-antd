import {FC, ReactElement, useEffect, useState} from "react";
import {DrawerForm} from "@trionesdev/antd-react-ext";
import {Button, Form, Input, InputNumber, message, Space} from "antd";
import {useRequest} from "ahooks";
import {inboundApi} from "@apis/tenant";
import {WarehouseAreaSelect} from "@app/normal/warehouse/components/warehouse-area-select";
import {WarehouseLocationSelect} from "@app/normal/warehouse/components/warehouse-location-select";
import {WarehouseContainerSelect} from "@app/normal/warehouse/components/warehouse-container-select";

type InboundOrderItemFormProps = {
    children?: ReactElement
    id?: string
    orderId?: string
    onRefresh?: () => void
    defaultOpen?: boolean
}
export const InboundOrderReceiveForm: FC<InboundOrderItemFormProps> = ({
                                                                        children,
                                                                        id,
                                                                        orderId,
                                                                        onRefresh,
                                                                        defaultOpen = false
                                                                    }) => {
    const [open, setOpen] = useState(defaultOpen)
    const [form] = Form.useForm();

    const {run: handleQueryInboundItem} = useRequest(() => {
        return inboundApi.findInboundOrderItemById(id!)
    }, {
        manual: true,
        onSuccess: (data) => {
            form.setFieldsValue(data)
        }
    })

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const request = id ? inboundApi.updateInboundOrderItemById(id, values) : inboundApi.receiveGoods(orderId!, values)
            request.then(async () => {
                message.success(`提交成功`)
                onRefresh?.()
                setOpen(false)
            })
        })
    }

    useEffect(() => {
        if (open && id) {
            handleQueryInboundItem()
        }
    }, [open, id]);

    return <DrawerForm title={`收货`} trigger={children} size={`large`} open={open}
                       onTriggerClick={() => setOpen(true)}
                       onClose={() => setOpen(false)}
                       afterOpenChange={(o) => {
                           if (!o) {
                               form.resetFields()
                           }
                       }}
                       form={form}
                       formProps={{layout: 'vertical'}} onOk={handleSubmit} footer={<Space><Button>取消</Button>
        <Button>继续收货</Button>
        <Button>收货</Button>
    </Space>}>
        <Form.Item label={`商品编码`} name={`skuCode`}>
            <Input/>
        </Form.Item>
        <Form.Item label={`批次号`} name={`lotNo`}>
            <Input addonAfter={`新建批次`}/>
        </Form.Item>
        <Form.Item label={`数量`} name={`quantity`}>
            <InputNumber min={0} style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item label={`托盘/容器`} name={`containerCode`}>
            <WarehouseContainerSelect/>
        </Form.Item>
        <Form.Item label={`仓库区域`} name={`areaCode`}>
            <WarehouseAreaSelect/>
        </Form.Item>
        <Form.Item label={`仓库库位`} name={`locationCode`}>
            <WarehouseLocationSelect/>
        </Form.Item>

    </DrawerForm>
}