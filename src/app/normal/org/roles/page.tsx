import {Layout} from "@trionesdev/antd-react-ext";
import {RolesPanel} from "@app/normal/org/roles/RolesPanel.tsx";
import {RoleMembersPanel} from "@app/normal/org/roles/RoleMembersPanel.tsx";
import styles from "./roles.module.less"

export const RolesPage = () => {

    return <Layout className={styles.rolesPage}>
        <Layout.Item style={{backgroundColor: 'white'}}>
            <RolesPanel/>
        </Layout.Item>
        <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
            <RoleMembersPanel/>
        </Layout.Item>
    </Layout>
}