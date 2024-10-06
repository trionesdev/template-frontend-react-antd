import {useState} from "react";
import {useRequest} from "ahooks";
import {tenantApi} from "@apis";
import styles from "./user-center.module.less"
import AvatarEditor from "../../commponents/avatar-editor";
import {Card, Menu} from "antd";

export const UserCenterLayout = () => {
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
                    <Card.Meta title={`sss`}/>
                </Card>
                <Menu items={[
                    {
                        key: '1',
                        label: '我的信息'
                    },
                    {
                        key: 'modify-password',
                        label: '修改密码'
                    }
                ]}/>
            </div>
        </div>
    </div>
}