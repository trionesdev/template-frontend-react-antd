import {useState} from "react";
import {GridTable, Layout, TableToolbar} from "@trionesdev/antd-react-ext";
import {useRequest} from "ahooks";
import {codeFormatRuleApi} from "@apis/tenant";
import {Button, Space} from "antd";
import {CodeFormatRuleForm} from "@app/normal/base/code-format-rules/CodeFormatRuleForm.tsx";
import {TimeFormatTypeOptions} from "@app/normal/base/internal/base.options.ts";
import {DateUtils} from "@trionesdev/commons";
import _ from "lodash";
import {RedoOutlined} from "@ant-design/icons";

export const CodeFormatRulesPage = () => {
    const [result, setResult] = useState<any[]>([])

    const {run: handlqQueryList, loading} = useRequest(() => {
        return codeFormatRuleApi.queryCodeFormatRuleList({})
    }, {
        onSuccess: (res: any) => {
            setResult(res || [])
        }
    })

    const columns: any[] = [
        {
            title: '名称',
            dataIndex: 'name',
            width: 120,
            render: (text: string) => {
                return <>{text}</>
            }
        },
        {
            title: '标识',
            dataIndex: 'identifier',
            width: 120
        },
        {
            title: '前缀',
            dataIndex: 'prefix',
            width: 120
        },
        {
            title: '时间格式',
            dataIndex: 'timeFormatType',
            width: 120,
            render: (text: string) => {
                return TimeFormatTypeOptions.find(item => item.value === text)?.label
            }
        },
        {
            title: '序列位数',
            dataIndex: 'serialNumberDigits',
            width: 120
        },
        {
            title: '示例',
            dataIndex: 'id',
            width: 120,
            render: (_text: string, record: any) => {
                let timeFormat = TimeFormatTypeOptions.find(item => item.value === record.timeFormatType)?.label
                if (timeFormat) {
                    const firstFourChars = timeFormat.slice(0, 8).toUpperCase();
                    const restOfStr = timeFormat.slice(8);
                    timeFormat = firstFourChars + restOfStr;
                }
                return `${record.prefix}${timeFormat ? DateUtils.format((new Date()).getTime(), timeFormat) : ''}${_.padStart("1", record.serialNumberDigits, '0')}`
            }
        },
        {
            title: '描述',
            dataIndex: 'description',
            render: (text: string) => {
                return <>{text}</>
            }
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 180,
            render: (_text: string, record: any) => {
                return <Space>
                    <Button size={`small`} type={`link`}>编辑</Button>
                    <Button size={`small`} type={`link`} danger={true}>删除</Button>
                </Space>
            }
        }
    ]

    return <Layout direction={`vertical`}>
        <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
            <GridTable fit={true} size={'small'}
                       toolbar={<TableToolbar title={<Space>
                           <CodeFormatRuleForm><Button type={`primary`}>新建规则</Button></CodeFormatRuleForm>
                       </Space>} extra={<Space>
                           <Button type={`text`} icon={<RedoOutlined/>} onClick={handlqQueryList}/>
                       </Space>}/>}
                       columns={columns} dataSource={result} rowKey={`id`}
                       loading={loading}
                       pagination={false}/>
        </Layout.Item>
    </Layout>
}