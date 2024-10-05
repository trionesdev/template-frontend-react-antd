import {useState} from "react";
import {useRequest} from "ahooks";
import {tenantApi} from "@apis";
import styles from "./user-center.module.less"
import AvatarEditor from "../../commponents/avatar-editor";

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
                <AvatarEditor />
            </div>
        </div>
    </div>
}