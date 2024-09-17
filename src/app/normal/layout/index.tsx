import {Outlet, useNavigate} from "@trionesdev/commons-react";
import styles from "./normal-layout.module.less"
import {Layout} from "@trionesdev/antd-react-ext";
import {Menu} from "antd";
import {RouteConstants} from "../../../router/route.constants.ts";

export const NormalLayout = () => {
    const navigate = useNavigate()

    const menuItems: any[] = [
        {
            key: 'org',
            label: '组织管理',
            children: [
                {
                    key: RouteConstants.ORG.DEPARTMENTS.id,
                    label: '部门管理',
                    onClick: () => navigate(RouteConstants.ORG.DEPARTMENTS.path!())
                },
                {
                    key: '1-2',
                    label: '员工管理',
                    onClick: () => navigate('/org/employees')
                }
            ]
        }
    ]

    return (
        <Layout className={styles.normalLayout}>
            <Layout.Sider>
                <Menu mode="inline" items={menuItems}/>
            </Layout.Sider>
            <Layout.Item auto style={{padding: 4, backgroundColor: '#f1f1f1'}}>
                <Outlet/>
            </Layout.Item>
        </Layout>
    );
}