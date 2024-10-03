import {useState} from "react";
import {useRequest} from "ahooks";
import {districtApi} from "@apis/boss";
import {GridTable} from "@trionesdev/antd-react-ext";
import {CaretDownOutlined, CaretRightOutlined} from "@ant-design/icons";
import _ from "lodash";
import {Button, Space} from "antd";
import {DistrictForm} from "@app/boss/dic/districts/DistrictForm.tsx";

export const DistrictsPage = () => {
    const [queryParams, setQueryParams] = useState({parentCode: "100000"})
    const [rows, setRows] = useState<any>([])
    const {run: handleQuery, loading} = useRequest(() => {
        return districtApi.queryDistrictList(queryParams)
    }, {
        onSuccess: (res: any) => {
            if (res) {
                setRows(res || [])
            }
        }
    })


    const columns: any[] = [
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '编码',
            dataIndex: 'code',
            width: 200
        },
        {
            title: '城市码',
            dataIndex: 'cityCode',
            width: 200
        },
        {
            title: '级别',
            dataIndex: 'level',
            width: 50
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 100,
            render: (_text: any, record: any) => {
                return <Space>
                    <DistrictForm id={record.id}><Button size={`small`} type={`link`}>编辑</Button></DistrictForm>
                </Space>
            }
        }
    ]

    return <div style={{height: '100%', backgroundColor: '#fff'}}>
        <GridTable fit={true} size={`small`} columns={columns} dataSource={rows} expandable={{
            expandIcon: ({expanded, onExpand, record}) => {
                if (record.level < 4) {
                    return expanded ? (
                        <CaretDownOutlined onClick={e => onExpand(record, e)}/>
                    ) : (
                        <CaretRightOutlined onClick={e => onExpand(record, e)}/>
                    )
                }
            },
            onExpand: (expanded, record) => {
                if (expanded) {
                    if (_.isEmpty(record.children)) {
                        districtApi.queryDistrictList({parentCode: record.code}).then((res: any) => {
                            record.children = res
                            setRows([...rows])
                        })
                    }
                }
            }
        }} loading={loading} rowKey={`id`} pagination={false}/>
    </div>

}