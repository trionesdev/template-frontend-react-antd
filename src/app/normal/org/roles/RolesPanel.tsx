import {useState} from "react";
import {Avatar, Button, Dropdown, Flex, Space, Spin, Tree} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import {useRequest} from "ahooks";
import {roleApi} from "@apis/backend";
import styles from "./roles.module.less"

export const RolesPanel = () => {
    const [roles, setRoles] = useState<any[]>([])
    const [selectedRole, setSelectedRole] = useState<any | undefined>()

    const {loading} = useRequest(() => {
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

    return <div className={styles.rolesPanel}>
        <Flex gap="small">
            <Flex gap="small" flex={1}>
                <Button block={true}>新建角色</Button>
            </Flex>
            {/*<Button type={`link`}>展开</Button>*/}
        </Flex>
        <Spin spinning={loading}>
            <Tree treeData={roles} defaultSelectedKeys={["0"]} selectedKeys={[selectedRole?.id]}
                  fieldNames={{title: 'name', key: 'id'}}
                  titleRender={(nodeData: any) => {
                      return <Flex justify={'space-between'} align={'baseline'}>
                          <div>
                              {nodeData.id == "0" ? <Space>
                                  <Avatar size={`small`} shape={`square`}/>
                                  <>{nodeData.name}</>
                              </Space> : <>{nodeData.name}</>}
                          </div>
                          <div className={`tree-node-extra`}>
                              <Dropdown menu={{items: []}}>
                                  <Button size={`small`} type={`text`} icon={<EllipsisOutlined/>}/>
                              </Dropdown>
                          </div>
                      </Flex>
                  }}
                  onSelect={(_keys, info) => {
                      if (info.selectedNodes?.[0]) {
                          selectedRole(info.selectedNodes?.[0])
                      }
                  }}
            />
        </Spin>
    </div>
}