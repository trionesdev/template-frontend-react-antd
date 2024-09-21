import {Layout} from "@trionesdev/antd-react-ext";
import {RolesPanel} from "@app/normal/org/roles/RolesPanel.tsx";
import {RoleMembersPanel} from "@app/normal/org/roles/RoleMembersPanel.tsx";
import styles from "./roles.module.less"
import {useState} from "react";

export const RolesPage = () => {
    const [selectedRole, setSelectedRole] = useState<any | undefined>()

    return <Layout className={styles.rolesPage}>
        <Layout.Item style={{backgroundColor: 'white'}}>
            <RolesPanel onRoleChange={setSelectedRole}/>
        </Layout.Item>
        <Layout.Item auto={true} style={{backgroundColor: 'white'}}>
            <RoleMembersPanel role={selectedRole}/>
        </Layout.Item>
    </Layout>
}