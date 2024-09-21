import {Layout} from "@trionesdev/antd-react-ext";
import {FC, useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {departmentApi} from "@apis";
import {Avatar, Button, Dropdown, Flex, message, Space, Spin, Tree} from "antd";
import classNames from "classnames";
import styles from "./org-structure.module.less";
import {EllipsisOutlined} from "@ant-design/icons";

type DepartmentsPanelProps = {
    onDepartmentChange?: (department: any) => void
}

export const DepartmentsPanel: FC<DepartmentsPanelProps> = ({onDepartmentChange}) => {

    const [departments, setDepartments] = useState([])
    const [department, setDepartment] = useState<any>()

    const {loading} = useRequest(() => {
        return departmentApi.queryDepartmentsTree({mode: 'TENANT_SIDEWAYS'})
    }, {
        onSuccess: (res: any) => {
            if (res) {
                setDepartments(res)
                if (!department) {
                    setDepartment(res?.[0])
                }
            }
        },
        onError: async (err) => {
            message.error(err.message)
        }
    })

    const handleNodeMenuItems = (nodeData: any) => {
        return []
    }

    useEffect(() => {
        onDepartmentChange?.(department)
    }, [department]);

    return <Layout direction={`vertical`}>
        <Layout.Item auto={true}>
            <Spin style={{minHeight: 300}} spinning={loading}>
                <Tree treeData={departments} defaultSelectedKeys={["0"]} selectedKeys={[department?.id]}
                      fieldNames={{title: 'name', key: 'id'}}
                      titleRender={(nodeData: any) => {
                          return <Flex justify={'space-between'} align={'baseline'}
                                       className={classNames({
                                           [styles.departmentRoot]: nodeData.id == "0",
                                       }, styles.treeNode)}>
                              <div>
                                  {nodeData.id == "0" ? <Space>
                                      <Avatar size={28} shape={`square`}/>
                                      <>{nodeData.name}</>
                                  </Space> : <>{nodeData.name}</>}
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
                              setDepartment(info.selectedNodes?.[0])
                          }
                      }}
                />
            </Spin>
        </Layout.Item>
    </Layout>
}