import {useState} from "react";
import {useRequest} from "ahooks";
import {ossApi, tenantApi} from "@apis";
import styles from "./user-center.module.less"
import {Card, Menu} from "antd";
import {Outlet, useMatches, useNavigate} from "@trionesdev/commons-react";
import {RouteConstants} from "../../router/route.constants.ts";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import { AvatarEditor } from "@trionesdev/antd-react-ext";

export const UserCenterLayout = () => {
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

    return <div className={styles.userCenterLayout}>
        <div className={styles.userCenterLayoutWrapper}>
            <div className={styles.userCenterLayoutWrapperSider}>
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
                        key: RouteConstants.USER_CENTER.PROFILE.id,
                        label: '我的信息',
                        icon: <UserOutlined/>,
                        onClick: () => {
                            navigate(RouteConstants.USER_CENTER.PROFILE.path())
                        }
                    },
                    {
                        key: RouteConstants.USER_CENTER.PASSWORD.id,
                        label: '修改密码',
                        icon: <LockOutlined/>,
                        onClick: () => {
                            navigate(RouteConstants.USER_CENTER.PASSWORD.path())
                        }
                    }
                ]}/>
            </div>
            <div className={styles.userCenterLayoutWrapperContent}>
                <Outlet/>
            </div>
        </div>
    </div>
}