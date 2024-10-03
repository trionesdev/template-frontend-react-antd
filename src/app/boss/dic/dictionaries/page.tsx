import {useEffect, useState} from "react";
import {GridTable, TableToolbar} from "@trionesdev/antd-react-ext";
import {DictionaryType} from "@app/boss/dic/internal/dic.enums.ts";
import {useRequest} from "ahooks";
import {dictionaryApi} from "@apis/boss";
import {Button, Space} from "antd";
import {DictionaryForm} from "@app/boss/dic/dictionaries/DictionaryForm.tsx";
import _ from "lodash";
import {ArrowLeftOutlined} from "@ant-design/icons";

export const DictionariesPage = () => {
    const [type, setType] = useState<any | undefined>()
    const [queryParams, setQueryParams] = useState<any>({type: DictionaryType.GROUP})
    const [rows, setRows] = useState<any>([])

    const {run: handleQuery} = useRequest(() => {
        return dictionaryApi.queryDictionaryList(queryParams)
    }, {
        manual: true,
        onSuccess: (res: any) => {
            setRows(res || [])
        }
    })

    useEffect(() => {
        handleQuery()
    }, [queryParams]);

    const columns: any[] = [
        {
            title: '字典类型',
            dataIndex: 'type',
        },
        {
            title: '字典名称',
            dataIndex: 'name',
        },
        {
            title: '字典编码',
            dataIndex: 'code',
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 120,
            render: (_text: any, record: any) => {
                return <Space>
                    {_.eq(record.type, DictionaryType.GROUP) && <Button size={`small`} type={`link`} onClick={() => {
                        setQueryParams({type: DictionaryType.DICTIONARY, typeCode: record.code})
                        setType(record)
                    }}>查看</Button>}
                    <Button size={`small`} type={`link`}>编辑</Button>
                </Space>
            }
        }
    ]

    return <div style={{height: '100%', backgroundColor: '#fff'}}>
        <GridTable
            toolbar={<TableToolbar
                title={<Space>
                    {type && <Button type={`text`} icon={<ArrowLeftOutlined/>} onClick={() => {
                        setQueryParams({type: DictionaryType.GROUP})
                        setType(undefined)
                    }}/>}
                    <span>{`字典类型${type ? `: ${type?.name}` : ''}`}</span>
                </Space>}
                extra={<Space>
                    <DictionaryForm defaultType={type ? DictionaryType.DICTIONARY : DictionaryType.GROUP}
                                    defaultTypeCode={type?.code}><Button
                        type={`primary`}>新建字典</Button></DictionaryForm>
                </Space>}/>}
            fit={true} size={`small`} columns={columns} dataSource={rows} rowKey={`id`}
            pagination={false}/>
    </div>
}