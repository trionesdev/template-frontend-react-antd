import {Layout} from "@trionesdev/antd-react-ext";
import {FC, useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {departmentApi} from "@apis";
import {Avatar, Button, Dropdown, Flex, message, Modal, Space, Spin, Tree} from "antd";
import classNames from "classnames";
import styles from "./org-structure.module.less";
import {ApartmentOutlined, EllipsisOutlined, PlusOutlined} from "@ant-design/icons";
import {DepartmentForm} from "@app/normal/org/components/department-form";

type DepartmentsPanelProps = {
    onDepartmentChange?: (department: any) => void
}

export const DepartmentsPanel: FC<DepartmentsPanelProps> = ({onDepartmentChange}) => {

    const [departments, setDepartments] = useState([])
    const [department, setDepartment] = useState<any>()

    const {run: handleQueryDepartments, loading} = useRequest(() => {
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
        const menuList: any[] = [
            {
                key: 'create-department',
                label: <DepartmentForm parentId={nodeData.id}><span
                    style={{width: '100%'}}>新建部门</span></DepartmentForm>
            }
        ]
        if (nodeData.id != "0") {
            menuList.push({
                key: 'edit-department',
                label: <DepartmentForm id={nodeData.id}><span style={{width: '100%'}}>编辑部门</span></DepartmentForm>
            })
            menuList.push({
                key: 'delete-department',
                label: '删除部门',
                danger: true,
                onClick: async () => {
                    Modal.confirm({
                        title: '确定删除部门？',
                        content: '删除部门后，其部门成员也会被删除，请谨慎操作！',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: async () => {
                            departmentApi.deleteDepartmentById(nodeData.id).then(() => {
                                handleQueryDepartments()
                            }).catch((ex: any) => {
                                message.error(ex.message)
                            })
                        }
                    })
                }
            })
        }
        return menuList
    }

    useEffect(() => {
        onDepartmentChange?.(department)
    }, [department]);

    return <Layout direction={`vertical`}>
        <Layout.Item>
            <Flex gap="small" style={{padding: '4px 0px'}}>
                <Flex gap="small" flex={1}>
                    <DepartmentForm onRefresh={handleQueryDepartments}>
                        <Button icon={<PlusOutlined/>} block={true}>新建部门</Button>
                    </DepartmentForm>
                </Flex>
            </Flex>
        </Layout.Item>
        <Layout.Item auto={true}>
            <Spin style={{minHeight: 300}} spinning={loading}>
                <Tree treeData={departments} defaultSelectedKeys={["0"]} selectedKeys={[department?.id]}
                      fieldNames={{title: 'name', key: 'id'}}
                      titleRender={(nodeData: any) => {
                          return <Flex justify={'space-between'} align={'baseline'}
                                       className={classNames({
                                           [styles.departmentRoot]: nodeData.id == "0",
                                       }, styles.treeNode)}>
                              <div style={{display: 'flex', height: '100%'}}>
                                  {nodeData.id == "0" ? <Space>
                                      <div>
                                          <Avatar size={28} shape={`square`} icon={<ApartmentOutlined/>}
                                                  src={nodeData.icon}/>
                                      </div>
                                      <div style={{fontSize: 16}}>{nodeData.name}</div>
                                  </Space> : <>{nodeData.name}</>}
                              </div>
                              {nodeData.id != "0" && <div className={`tree-node-extra`}>
                                  <Dropdown menu={{items: handleNodeMenuItems(nodeData)}}
                                            overlayStyle={{minWidth: 100}}>
                                      <Button size={`small`} type={`text`} icon={<EllipsisOutlined/>}/>
                                  </Dropdown>
                              </div>}
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