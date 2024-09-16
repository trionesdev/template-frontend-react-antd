import {GridTable, Layout} from "@trionesdev/antd-react-ext";
import {useState} from "react";
import {useRequest} from "ahooks";
import {functionalResourceApi} from "../../../../apis/boss";
import {ClientType} from "@app/boss/perm/internal/perm.enum.ts";


export const FunctionalResourcesPage = () => {
    const [treeData, setTreeData] = useState<any[] | undefined>()

    const {loading} = useRequest(() => {
        return functionalResourceApi.queryFunctionalResourceDraftTree({clientType: ClientType.PC_WEB})
    }, {
        onSuccess: (res: any) => {
            debugger
            if (res) {
                setTreeData([])
            }
        }
    })


    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
        }
    ]
    return <Layout direction={`vertical`}>
        <Layout.Item>
            <GridTable size={`small`} columns={columns} dataSource={treeData} pagination={false} loading={loading}/>
        </Layout.Item>
    </Layout>
}