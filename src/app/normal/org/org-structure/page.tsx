import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {useState} from "react";
import {Avatar, Button, Dropdown, Empty, Flex, message, Space, Spin, Tree} from "antd";
import {useRequest} from "ahooks";
import styles from "./org-structure.module.less"
import classNames from "classnames";
import {EllipsisOutlined} from "@ant-design/icons";
import {DepartmentMembers} from "./DepartmentMembers";
import {departmentApi} from "@apis";

export const OrgStructurePage = () => {

    const [departments, setDepartments] = useState([])
    const [department, setDepartment] = useState<any>()

    const { loading} = useRequest(() => {
        return departmentApi.queryDepartmentsTree({mode: 'TENANT_SIDEWAYS'})
    }, {
        onSuccess: (data: any) => {
            setDepartments(data)
            if (!department) {
                setDepartment(data?.[0])
            }
        },
        onError: async (err) => {
            message.error(err.message)
        }
    })

    return <PanelGroup direction="horizontal" className={styles.orgStructure}>
        <Panel className={styles.departmentPanel} style={{maxWidth: 350,minWidth:200}} defaultSize={20}  minSize={20} maxSize={30}>
            <div className={styles.departmentPanelHeader}></div>
            <div className={styles.departmentPanelBody}>
                <Spin spinning={loading}>
                    <Tree treeData={departments} defaultSelectedKeys={["0"]} selectedKeys={[department?.id]}
                          fieldNames={{title: 'name', key: 'id'}}
                          titleRender={(nodeData: any) => {
                              return <Flex justify={'space-between'} align={'baseline'}
                                           className={classNames((nodeData.id == "0" ? styles.departmentRoot : ''), styles.treeNode)}>
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
                              if (info.selectedNodes?.[0]){
                                  setDepartment(info.selectedNodes?.[0])
                              }
                          }}
                    />
                </Spin>
            </div>
        </Panel>
        <PanelResizeHandle/>
        <Panel className={styles.membersPanel}>
            {!!department ? <DepartmentMembers department={department}/> : <Empty style={{padding:20}}/>}
        </Panel>
    </PanelGroup>
}