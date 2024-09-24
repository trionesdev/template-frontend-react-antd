import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {useState} from "react";
import {Empty} from "antd";
import styles from "./org-structure.module.less"
import {DepartmentMembersPanel} from "./DepartmentMembersPanel.tsx";
import {DepartmentsPanel} from "@app/normal/org/org-structure/DepartmentsPanel.tsx";

export const OrgStructurePage = () => {

    const [department, setDepartment] = useState<any>()

    return <PanelGroup direction="horizontal" className={styles.orgStructure}>
        <Panel className={styles.departmentPanel} style={{maxWidth: 350, minWidth: 200}} defaultSize={20} minSize={20}
               maxSize={30}>
            <DepartmentsPanel onDepartmentChange={setDepartment}/>
        </Panel>
        <PanelResizeHandle/>
        <Panel className={styles.membersPanel}>
            {!department ? <Empty style={{padding: 20}}/> : <DepartmentMembersPanel department={department}/>}
        </Panel>
    </PanelGroup>
}