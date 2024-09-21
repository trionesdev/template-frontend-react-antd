import {FC, useEffect, useState} from "react";
import {Button, Dropdown, Flex, Modal, Spin, Tree} from "antd";
import {EllipsisOutlined, UserAddOutlined} from "@ant-design/icons";
import {useRequest} from "ahooks";
import {roleApi} from "@apis/backend";
import styles from "./roles.module.less"
import {RoleForm} from "@app/normal/org/roles/RoleForm.tsx";
import {Layout} from "@trionesdev/antd-react-ext";

type RolesPanelProps = {
    onRoleChange?: (role: any) => void
}
export const RolesPanel: FC<RolesPanelProps> = ({onRoleChange}) => {
    const [roles, setRoles] = useState<any[]>([])
    const [selectedRole, setSelectedRole] = useState<any | undefined>()

    const {run: handleQueryRoles, loading} = useRequest(() => {
        return roleApi.queryRoleTree()
    }, {
        onSuccess: (res: any) => {
            if (res) {
                setRoles(res || [])
            }
        },
        onFinally: () => {

        }
    })

    const handleNodeMenuItems = (nodeData: any) => {
        return [
            {
                key: nodeData.id,
                label: <RoleForm id={nodeData.id} onRefresh={handleQueryRoles}><span>编辑</span></RoleForm>
            },
            {
                key: 'delete',
                danger: true,
                label: '删除',
                onClick: () => {
                    Modal.confirm({
                        title: '删除角色',
                        content: '确定删除该角色？',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: async () => {
                            roleApi.deleteRoleById(nodeData.id).then(() => {
                                handleQueryRoles()
                            })
                        }
                    })
                }
            }
        ]
    }

    useEffect(() => {
        onRoleChange?.(selectedRole)
    }, [selectedRole]);

    return <Layout direction={`vertical`} className={styles.rolesPanel}>
        <Layout.Item>
            <Flex gap="small" style={{padding: '4px 0px'}}>
                <Flex gap="small" flex={1}>
                    <RoleForm onRefresh={handleQueryRoles}><Button icon={<UserAddOutlined/>}
                                                                   block={true}>新建角色</Button></RoleForm>
                </Flex>
                {/*<Button type={`link`}>展开</Button>*/}
            </Flex>
        </Layout.Item>
        <Layout.Item auto={true}>
            <Spin spinning={loading}>
                <Tree treeData={roles} defaultSelectedKeys={["0"]} selectedKeys={[selectedRole?.id]}
                      fieldNames={{title: 'name', key: 'id'}}
                      titleRender={(nodeData: any) => {
                          return <Flex justify={'space-between'} align={'baseline'}>
                              <div>
                                  {nodeData.name}
                              </div>
                              <div className={`tree-node-extra`}>
                                  <Dropdown menu={{items: handleNodeMenuItems(nodeData)}}
                                            overlayStyle={{minWidth: 100}}>
                                      <Button size={`small`} type={`text`} icon={<EllipsisOutlined/>}/>
                                  </Dropdown>
                              </div>
                          </Flex>
                      }}
                      onSelect={(_keys, info) => {
                          if (info.selectedNodes?.[0]) {
                              setSelectedRole(info.selectedNodes?.[0])
                          }
                      }}
                />
            </Spin>
        </Layout.Item>
    </Layout>
}