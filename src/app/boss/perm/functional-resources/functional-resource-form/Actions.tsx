import {Button, Form, Input, Space, Table} from "antd";
import {FC, useEffect} from "react";
import {MinusCircleOutlined} from "@ant-design/icons";
import _ from "lodash";

type ActionsProps = {
    value?: any[],
    onChange?: (actions: any[]) => void
}
export const Actions: FC<ActionsProps> = ({value, onChange}) => {
    const [form] = Form.useForm()
    const actions = Form.useWatch('actions', {preserve: true, form})

    const handleValuesChange = _.debounce((
        _, changedValues
    ) => {
        console.log("ss,", changedValues)
    }, 500)

    useEffect(() => {

    }, [value])

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            render: (_text: any, _record: any, index: number) => {
                return <Form.Item noStyle={true} name={['actions', index, 'name']} required={true}>
                    <Input/>
                </Form.Item>
            }
        },
        {
            title: '标识',
            dataIndex: 'identifier',
            render: (_text: any, _record: any, index: number) => {
                return <Form.Item noStyle={true} name={['actions', index, 'identifier']} required={true}>
                    <Input/>
                </Form.Item>
            }
        },
        {
            dataIndex: 'id',
            render: (_text: any, _record: any, index: number) => {
                return <Space>
                    <Button size={`small`} icon={<MinusCircleOutlined/>} type={`text`} onClick={() => {
                        form.setFieldsValue({actions: _.cloneDeep(actions.filter((_: any, i: number) => i !== index))})
                    }}/>
                </Space>
            }
        }
    ]
    return <Form form={form} initialValues={{actions: value || []}} onValuesChange={handleValuesChange}>
        <div style={{padding: 4}}>
            <Button type={`primary`} onClick={() => {
                form.setFieldsValue({actions: actions.concat({})})
            }}>新增操作</Button>
        </div>
        <Table size={`small`} columns={columns} dataSource={actions} pagination={false}/>
    </Form>
}