import {useState} from "react";
import {GridTable, Layout, TableToolbar} from "@trionesdev/antd-react-ext";
import {Button, message, Popconfirm, Space} from "antd";
import {ApartmentOutlined, RedoOutlined} from "@ant-design/icons";
import {useRequest} from "ahooks";
import {departmentApi} from "@apis/backend";
import _ from "lodash";
import {DepartmentForm} from "@app/normal/org/components/department-form";

export const DepartmentsPage = () => {
    const [result, setResult] = useState<any>()

    const {run: handleQuery, loading} = useRequest(() => {
        return departmentApi.queryDepartmentsTree()
    }, {
        onSuccess: (res: any) => {
            setResult(res)
        }
    })

    const columns: any[] = [
        {
            title: '部门名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '部门描述',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: '操作',
            key: 'id',
            width: 220,
            render: (_text: any, record: any) => {
                return (record.id != "0") && <Space>
                    <DepartmentForm id={record.id} onRefresh={handleQuery}>
                        <Button size={`small`} type={`link`}>编辑</Button>
                    </DepartmentForm>
                    <DepartmentForm parentId={record.id} onRefresh={handleQuery}>
                        <Button size={`small`} type={`link`}>添加子项</Button>
                    </DepartmentForm>
                    <Popconfirm title={`确定删除?`} onConfirm={() => {
                        departmentApi.deleteDepartmentById(record.id).then(handleQuery).catch(async (err) => {
                            message.error(err)
                        })
                    }}>
                        <Button disabled={!_.isEmpty(record.children)} size={`small`} type={`link`} danger>删除</Button>
                    </Popconfirm>
                </Space>
            }
        }
    ]

    return (
        <Layout>
            <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
                <GridTable
                    toolbar={<TableToolbar title={<Space>
                        <DepartmentForm onRefresh={handleQuery}>
                            <Button type={`primary`} icon={<ApartmentOutlined/>}>新建部门</Button></DepartmentForm>
                    </Space>} extra={<Space>
                        <Button icon={<RedoOutlined/>} type={`text`} onClick={handleQuery}/>
                    </Space>}/>}
                    expandable={{
                        defaultExpandAllRows: true,
                        defaultExpandedRowKeys: ["0"],
                    }}
                    fit={true} size={'small'} columns={columns} dataSource={result} rowKey={`id`}
                    loading={loading}
                    pagination={false}
                />
            </Layout.Item>
        </Layout>
    )
}