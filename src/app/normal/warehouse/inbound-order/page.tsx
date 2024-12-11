import {useParams} from "@trionesdev/commons-react";
import {useRequest} from "ahooks";
import {inboundApi} from "@apis/tenant";
import {GridTable, Layout, PageHeader, TableToolbar} from "@trionesdev/antd-react-ext";
import {Button, Descriptions, Space} from "antd";
import {useEffect, useState} from "react";
import {InboundOrderReceiveForm} from "@app/normal/warehouse/inbound-order/InboundOrderReceiveForm.tsx";
import {SyncOutlined} from "@ant-design/icons";

const InboundOrderPage = () => {
    const {id} = useParams()
    const [inboundOrder, setInboundOrder] = useState<any>()
    const [rows, setRows] = useState<any[]>([])


    const {run: handleQueryInboundOrder} = useRequest(() => {
        return inboundApi.findInboundOrderById(id!)
    }, {
        manual: true,
        onSuccess: (res) => {
            setInboundOrder(res)
        }
    })

    const {run: handleQueryOrderItems, loading: queryItemsLoading} = useRequest(() => {
        return inboundApi.findInboundOrderItemsByOrderId(id!)
    }, {
        manual: true,
        onSuccess: (res: any) => {
            setRows(res || [])
        }
    })

    const columns: any[] = [
        {
            title: '商品编码',
            dataIndex: 'skuCode'
        },
        {
            title: '批次号',
            dataIndex: 'lotNo'
        },
        {
            title: '数量',
            dataIndex: 'quantity'
        }
    ]

    useEffect(() => {
        if (id) {
            handleQueryInboundOrder()
            handleQueryOrderItems()
        }
    }, []);

    return <Layout direction={"vertical"} style={{gap: 4}}>
        <Layout.Item style={{backgroundColor: 'white'}}>
            <PageHeader title={`入库单详情`}/>
            <Descriptions style={{padding: 8}}>
                <Descriptions.Item label={`入库单号`}>{inboundOrder?.orderNo}</Descriptions.Item>
                <Descriptions.Item label={`ASN号`}>{inboundOrder?.asnNo}</Descriptions.Item>
            </Descriptions>
        </Layout.Item>
        <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
            <GridTable toolbar={<TableToolbar title={`入库项列表`}
                                              extra={<Space>
                                                  <InboundOrderReceiveForm orderId={id}><Button
                                                      type={`primary`}>添加入库项</Button></InboundOrderReceiveForm>
                                                  <Button icon={<SyncOutlined/>} type={`text`}
                                                          onClick={handleQueryOrderItems}/>
                                              </Space>}/>}
                       fit={true} size={`small`} columns={columns} dataSource={rows} rowKey={`id`} loading={queryItemsLoading}
                       pagination={false}/>
        </Layout.Item>
    </Layout>
}
export default InboundOrderPage