import {FC, useEffect, useState} from "react";
import {GridTable, Layout, ReactDomUtils, SearchToolbar, TableToolbar} from "@trionesdev/antd-react-ext";
import {PageResult} from "@apis";
import {Button, Input, Space} from "antd";
import {InboundOrderForm} from "@app/normal/warehouse/inbound-orders/InboundOrderForm.tsx";
import {useRequest} from "ahooks";
import {inboundApi} from "@apis/tenant";
import {SyncOutlined} from "@ant-design/icons";

const InboundOrderPage: FC = () => {
    const [pageParams, setPageParams] = useState({pageNum: 1, pageSize: 10})
    const [result, setResult] = useState<PageResult<any>>({rows: [], total: 0})

    const {run: handleQueryPage, loading} = useRequest(() => {
        const params = {...pageParams}
        return inboundApi.findInboundOrderPage(params)
    }, {
        manual: true,
        onSuccess: (res: any) => {
            setResult(res)
        }
    })

    useEffect(() => {
        handleQueryPage()
    }, [pageParams]);

    const columns: any[] = [
        {
            title: '单号',
            dataIndex: 'orderNo',
        },
        {
            title: 'ASN号',
            dataIndex: 'asnNo',
        },
        {
            title: '操作',
            width: 200,
            render: (_text: string, record: any) => {
                return <Space>
                    <Button type={`link`}>详情</Button>
                    <Button type={`link`} onClick={() => {
                        ReactDomUtils.render(<InboundOrderForm id={record.id} onRefresh={handleQueryPage} defaultOpen={true}/>)
                    }}>修改</Button>
                    <Button type={`link`}>收货</Button>
                </Space>
            }
        }
    ]

    return <Layout direction={"vertical"} style={{gap: 4}}>
        <Layout.Item style={{backgroundColor: 'white'}}>
            <SearchToolbar items={[
                {label: '仓库', name: 'warehouseId', children: <Input type={'text'}/>},
                {label: '单号', name: 'orderNo', children: <Input type={'text'}/>}
            ]}/>
        </Layout.Item>
        <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
            <GridTable fit={true} size={`small`}
                       toolbar={<TableToolbar title={<Space>
                           <InboundOrderForm><Button type={`primary`}>新建入库单</Button></InboundOrderForm>
                       </Space>} extra={<Space>
                           <Button type={`text`} icon={<SyncOutlined/>} onClick={handleQueryPage}/>
                       </Space>}/>}
                       columns={columns}
                       dataSource={result.rows}
                       loading={loading}
                       pagination={{
                           current: pageParams.pageNum,
                           total: result.total,
                           pageSize: pageParams.pageSize,
                           onChange: (page, pageSize) => {
                               setPageParams({pageNum: page, pageSize: pageSize})
                           }
                       }}
            />
        </Layout.Item>
    </Layout>
}
export default InboundOrderPage;