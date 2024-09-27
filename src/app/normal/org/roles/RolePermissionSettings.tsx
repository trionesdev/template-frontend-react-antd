import {DrawerForm, GridTable} from "@trionesdev/antd-react-ext";
import React, {FC, useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis/boss";
import {ResourceTypeOptions} from "@app/boss/perm/internal/perm.options.ts";
import {Checkbox, Form} from "antd";

type RolePermissionSettingsProps = {
    children?: React.ReactElement
    roleId: string,
    editable?: boolean
}

export const RolePermissionSettings: FC<RolePermissionSettingsProps> = ({children, roleId, editable}) => {
    const [open, setOpen] = useState(false)
    const [treeData, setTreeData] = useState<any[] | undefined>()

    const {run: handleQuery, loading} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceTree({})
    }, {
        manual: true,
        onSuccess: (res: any) => {
            if (res) {
                setTreeData(res || [])
            }
        }
    })

    useEffect(() => {
        handleQuery()
    }, []);

    const columns = [
        {
            title: '类型',
            dataIndex: 'type',
            width: 200,
            render: (type: string) => {
                return ResourceTypeOptions.find(item => item.value === type)?.label
            }
        },
        {
            title: '名称',
            dataIndex: 'name',
            width: 200
        },
        {
            title: '标识',
            dataIndex: 'uniqueCode',
            width: 200
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: '',
            dataIndex: 'action',
            width: 80,
            render: (_: any, record: { uniqueCode: any; }) => {
                return <Form.Item noStyle={true} name={record.uniqueCode}>
                    <Checkbox/>
                </Form.Item>
            }
        }
    ]


    return <DrawerForm title="权限配置" open={open} trigger={children} width={800} afterOpenChange={setOpen}
                       formProps={{disabled: !editable}}>
        <GridTable fit={true} size={`small`} columns={columns} dataSource={treeData} loading={loading}
                   pagination={false}/>
    </DrawerForm>
}