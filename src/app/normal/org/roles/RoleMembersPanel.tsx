import {FC, useEffect, useState} from "react";
import {GridTable, Layout, PageHeader, TableToolbar} from "@trionesdev/antd-react-ext";
import {Button, message} from "antd";
import OrgSelectModal from "../../../../commponents/org-select-modal";
import {departmentApi, PageResult, roleApi} from "@apis";
import {RoleGrantObjType} from "@app/normal/org/internal/org.enums.ts";
import {useRequest} from "ahooks";

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
            dataIndex: 'name'
        }
    ]
    return <Layout direction={`vertical`}>
        <Layout.Item>
            <PageHeader backIcon={false} title={role?.name}/>
        </Layout.Item>
        <Layout.Item auto={true}>
            <GridTable toolbar={<TableToolbar title={[
                <OrgSelectModal selectMode={'member'} cleanAfterClose={true} orgLevelsRequest={(departmentId) => {
                    return departmentApi.queryDepartmentPaths(departmentId)
                }} orgNodesRequest={(departmentId) => {
                    return departmentApi.queryDepartmentOrgNodeList({departmentId})
                }} onOk={handleAddMembers}><Button type={`primary`}>添加成员</Button></OrgSelectModal>
            ]}/>}
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