import {DrawerForm, GridTable} from "@trionesdev/antd-react-ext";
import React, {FC, useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "@apis/boss";
import {ResourceTypeOptions} from "@app/boss/perm/internal/perm.options.ts";
import {Checkbox, Form} from "antd";
import _ from "lodash";
import {icons} from "../../../../commponents/icon-select";
import {PermissionEffect, PermissionSubjectType} from "@app/boss/perm/internal/perm.enums.ts";
import {policyApi} from "@apis";

type RolePermissionSettingsProps = {
    children?: React.ReactElement
    roleId: string,
    editable?: boolean
}

export const RolePermissionSettings: FC<RolePermissionSettingsProps> = ({children, roleId, editable = true}) => {
    const [form] = Form.useForm()
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

    const {run: handleQueryRolePermissions} = useRequest(() => {
        return policyApi.queryPermissionsBySubject({subjectType: PermissionSubjectType.ROLE, subject: roleId})
    }, {
        manual: true,
        onSuccess: (res: any) => {
            if (res) {
                const formData = _.map(res, (item: any) => {
                    return {
                        [item.obj]: item.effect === PermissionEffect.ALLOW
                    }
                })
                form.setFieldsValue(_.assign({}, ...formData))
            }
        }
    })

    const handleSubmit = () => {
        form.validateFields().then((values: any) => {
            console.log(values)
            const permissions = _.map(values, (checked: any, key: string) => {
                return {
                    obj: key,
                    effect: checked ? PermissionEffect.ALLOW : PermissionEffect.DENY
                }
            }).filter(item => item.effect === PermissionEffect.ALLOW)

            policyApi.savePolicy({
                subjectType: PermissionSubjectType.ROLE,
                subject: roleId,
                permissions: permissions
            })
        })
    }

    useEffect(() => {
        if (open) {
            handleQuery()
        }
    }, [open]);

    useEffect(() => {
        if (open && roleId) {
            handleQueryRolePermissions()
        }
    }, [roleId, open]);

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
            title: '图标',
            dataIndex: 'icon',
            width: 50,
            render: (icon: string) => {
                return <>{_.get(icons, icon)}</>
            }
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
                return <Form.Item noStyle={true} name={record.uniqueCode} valuePropName={`checked`}>
                    <Checkbox/>
                </Form.Item>
            }
        }
    ]


    return <DrawerForm title="权限配置" open={open} trigger={children} width={1000} afterOpenChange={setOpen}
                       form={form} formProps={{disabled: !editable}} onOk={handleSubmit}>
        <GridTable fit={true} size={`small`} columns={columns} dataSource={treeData} rowKey={`id`} loading={loading}
                   pagination={false}/>
    </DrawerForm>
}