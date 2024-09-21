import {useState} from "react";
import {Button, Dropdown, Flex, Spin, Tree} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import {useRequest} from "ahooks";
import {roleApi} from "@apis/backend";
import styles from "./roles.module.less"
import {RoleForm} from "@app/normal/org/roles/RoleForm.tsx";

export const RolesPanel = () => {
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
            }
        ]
    }


    return <div className={styles.rolesPanel}>
        <Flex gap="small">
            <Flex gap="small" flex={1}>
                <RoleForm onRefresh={handleQueryRoles}><Button block={true}>新建角色</Button></RoleForm>
            </Flex>
            {/*<Button type={`link`}>展开</Button>*/}
        </Flex>
        <Spin spinning={loading}>
            <Tree treeData={roles} defaultSelectedKeys={["0"]} selectedKeys={[selectedRole?.id]}
                  fieldNames={{title: 'name', key: 'id'}}
                  titleRender={(nodeData: any) => {
                      return <Flex justify={'space-between'} align={'baseline'}>
                          <div>
                              {nodeData.name}
                          </div>
                          <div className={`tree-node-extra`}>
                              <Dropdown menu={{items: handleNodeMenuItems(nodeData)}}>
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
    </div>
}