import {RolesPanel} from "@app/normal/org/roles/RolesPanel.tsx";
import {RoleMembersPanel} from "@app/normal/org/roles/RoleMembersPanel.tsx";
import styles from "./roles.module.less"
import {useState} from "react";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {Empty} from "antd";

export const RolesPage = () => {
    const [selectedRole, setSelectedRole] = useState<any | undefined>()

    return <PanelGroup direction="horizontal" className={styles.rolesPage}>
        <Panel style={{maxWidth: 350, minWidth: 200, backgroundColor: 'white', borderRight: '1px solid #d9d9d9'}}
               defaultSize={20} minSize={20}
               maxSize={30}>
            <RolesPanel onRoleChange={setSelectedRole}/>
        </Panel>
        <PanelResizeHandle/>
        <Panel className={styles.roleMembersPanel}>
            {selectedRole ? <RoleMembersPanel role={selectedRole}/> : <Empty style={{padding: 20}}/>}
        </Panel>
    </PanelGroup>
}