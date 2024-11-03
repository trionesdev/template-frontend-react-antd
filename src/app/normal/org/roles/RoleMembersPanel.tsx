import {FC, useEffect, useState} from "react";
import {GridTable, Layout, PageHeader, TableToolbar} from "@trionesdev/antd-react-ext";
import {Avatar, Button, message, Popconfirm, Space} from "antd";
import OrgSelectModal from "../../../../commponents/org-select-modal";
import { PageResult} from "@apis";
import {RoleGrantObjType} from "@app/normal/org/internal/org.enums.ts";
import {useRequest} from "ahooks";
import {RedoOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import {RolePermissionSettings} from "@app/normal/org/roles/RolePermissionSettings.tsx";
import {departmentApi, roleApi} from "@apis/tenant";

type RoleMembersPanelProps = {
    role?: any
}
export const RoleMembersPanel: FC<RoleMembersPanelProps> = ({role}) => {
    const [pageParams, setPageParams] = useState({pageNum: 1, pageSize: 10})
    const [result, setResult] = useState<PageResult<any>>({rows: [], total: 0})

    const {run: handleQueryPage, loading} = useRequest(() => {
        return roleApi.queryRoleMemberPage(role?.id, {...pageParams})
    }, {
        manual: true,
        onSuccess: (res: any) => {
            if (res) {
                setResult(res)
            }
        }
    })

    const handleAddMembers = (members: any) => {
        const memberIds = members.map((member: any) => member.id)
        roleApi.grantRole(role?.id, {grantObjType: RoleGrantObjType.MEMBER, grantObjIds: memberIds}).then(async () => {
            message.success('添加成功')
            handleQueryPage()
        }).catch(async (ex) => {
            message.error(ex.message)
        })
    }

    useEffect(() => {
        if (role?.id) {
            handleQueryPage()
        }
    }, [role?.id])

    const columns: any[] = [
        {
            title: '姓名',
            dataIndex: 'nickname',
            render: (text: any, record: any) => {
                return <Space>
                    <Avatar size={`small`} icon={<UserOutlined/>} src={record?.avatar} shape={`square`}/>
                    <span>{text}</span>
                </Space>
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '操作',
            dataIndex: 'id',
            width: 100,
            render: (_id: string, record: any) => {
                return <Space>
                    <Popconfirm title={`确定删除该成员`} onConfirm={async () => {
                        roleApi.removeRoleGrantsBatch(role?.id, {
                            grantObjType: RoleGrantObjType.MEMBER,
                            grantObjIds: [record?.memberId]
                        }).then(async () => {
                            message.success('移除成功')
                            handleQueryPage()
                        }).catch(async (ex) => {
                            message.error(ex.message)
                        })
                    }}>
                        <Button size={`small`} type={`link`} danger={true}>移除</Button>
                    </Popconfirm>
                </Space>
            }
        }
    ]
    return <Layout direction={`vertical`}>
        <Layout.Item>
            <PageHeader backIcon={false} title={role?.name} extra={<Space>
                <RolePermissionSettings roleId={role?.id}><Button
                    type={`link`}>权限配置</Button></RolePermissionSettings>
            </Space>}/>
        </Layout.Item>
        <Layout.Item auto={true}>
            <GridTable toolbar={<TableToolbar title={<Space>
                <OrgSelectModal selectMode={'member'} cleanAfterClose={true} orgLevelsRequest={(departmentId) => {
                    return departmentApi.queryDepartmentPaths(departmentId)
                }} orgNodesRequest={(departmentId) => {
                    return departmentApi.queryDepartmentOrgNodeList({departmentId})
                }} onOk={handleAddMembers}><Button icon={<UserAddOutlined/>}
                                                   type={`primary`}>添加成员</Button></OrgSelectModal>
            </Space>} extra={<Space>
                <Button icon={<RedoOutlined/>} type={`text`} onClick={handleQueryPage}/>
            </Space>}/>}
                       fit={true}
                       size={`small`}
                       loading={loading}
                       rowKey={`id`}
                       columns={columns} dataSource={result?.rows}
                       pagination={{
                           current: pageParams.pageNum,
                           total: result.total,
                           pageSize: pageParams.pageSize,
                           onChange: (page, pageSize) => {
                               setPageParams({pageNum: page, pageSize: pageSize})
                           }
                       }}/>
        </Layout.Item>
    </Layout>
}