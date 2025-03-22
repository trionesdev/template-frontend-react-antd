import {useState} from "react";
import {useRequest} from "ahooks";
import styles from "./member-center.module.less"
import {Card, Menu} from "antd";
import {Outlet, useMatches, useNavigate} from "@trionesdev/commons-react";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import { AvatarEditor } from "@trionesdev/antd-react-ext";
import {ossApi, tenantApi} from "@apis/tenant";
import {RouteConstants} from "../../../../router/route.constants.ts";

 const MemberCenterLayout = () => {
    const navigate = useNavigate()
    const matches = useMatches();

    const [actor, setActor] = useState<any>()

    useRequest(() => {
        return tenantApi.queryActorMember()
    }, {
        onSuccess(data:any) {
            setActor(data)
        }
    })

    return <div className={styles.memberCenterLayout}>
        <div className={styles.memberCenterLayoutWrapper}>
            <div className={styles.memberCenterLayoutWrapperSider}>
                <Card cover={<AvatarEditor size={250} value={actor?.avatar} uploadRequest={(file: File) => {
                    const formData = new FormData()
                    formData.append('file', file)
                    return ossApi.formDataUpload(formData).then((res: any) => {
                        return res.url
                    })
                }} onChange={async (url) => {
                    await tenantApi.updateActorMember({avatar: url})
                }}/>}>
                    <Card.Meta title={actor?.nickname}/>
                </Card>
                <Menu selectedKeys={[matches[matches.length - 1].id]} items={[
                    {
                        key: RouteConstants.MEMBER_CENTER.PROFILE.id,
                        label: '我的信息',
                        icon: <UserOutlined/>,
                        onClick: () => {
                            navigate(RouteConstants.MEMBER_CENTER.PROFILE.path())
                        }
                    },
                    {
                        key: RouteConstants.MEMBER_CENTER.PASSWORD.id,
                        label: '修改密码',
                        icon: <LockOutlined/>,
                        onClick: () => {
                            navigate(RouteConstants.MEMBER_CENTER.PASSWORD.path())
                        }
                    }
                ]}/>
            </div>
            <div className={styles.memberCenterLayoutWrapperContent}>
                <Outlet/>
            </div>
        </div>
    </div>
}
export default MemberCenterLayout
