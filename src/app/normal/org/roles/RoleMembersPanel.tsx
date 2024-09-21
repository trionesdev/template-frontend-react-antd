import {FC} from "react";
import {GridTable, Layout, PageHeader, TableToolbar} from "@trionesdev/antd-react-ext";
import {Button} from "antd";
import OrgSelectModal from "../../../../commponents/org-select-modal";
import {departmentApi} from "@apis";

type RoleMembersPanelProps = {
    role?: any
}
export const RoleMembersPanel: FC<RoleMembersPanelProps> = ({role}) => {

    const handleAddMembers = (members: any) => {
        console.log(members)
    }

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
                }} onOk={handleAddMembers}><Button type={`primary`}>添加资源</Button></OrgSelectModal>
            ]}/>}
                       fit={true}
                       size={`small`}
                       columns={columns}/>
        </Layout.Item>
    </Layout>
}