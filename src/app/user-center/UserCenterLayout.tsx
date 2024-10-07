import {useState} from "react";
import {useRequest} from "ahooks";
import {tenantApi} from "@apis";
import styles from "./user-center.module.less"
import AvatarEditor from "../../commponents/avatar-editor";
import {Card, Menu} from "antd";
import {Outlet, useNavigate} from "@trionesdev/commons-react";
import {RouteConstants} from "../../router/route.constants.ts";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

export const UserCenterLayout = () => {
    const navigate = useNavigate()
    const [actor, setActor] = useState<any>()

    const {run} = useRequest(() => {
        return tenantApi.queryActorMember()
    }, {
        onSuccess(data) {
            setActor(data)
        }
    })

    return <div className={styles.userCenterLayout}>
        <div className={styles.userCenterLayoutWrapper}>
            <div className={styles.userCenterLayoutWrapperSider}>
                <Card cover={<AvatarEditor size={250} uploadRequest={(file: File) => {
                    console.log(file)
                    return Promise.resolve('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')
                }}/>}>
                    <Card.Meta title={actor?.nickname}/>
                </Card>
                <Menu items={[
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