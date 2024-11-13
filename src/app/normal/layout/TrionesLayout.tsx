import {Outlet, useNavigate} from "@trionesdev/commons-react";
import styles from "./normal-layout.module.less"
import {Layout} from "@trionesdev/antd-react-ext";
import {Menu} from "antd";
import {RouteConstants} from "../../../router/route.constants.ts";
import {ApartmentOutlined, DatabaseOutlined, DesktopOutlined} from "@ant-design/icons";

export const TrionesLayout = () => {
    const navigate = useNavigate()

    const menuItems: any[] = [
        {
            key: 'org',
            label: '组织管理',
            icon: <ApartmentOutlined/>,
            children: [
                {
                    key: RouteConstants.ORG.MEMBERS.id,
                    label: RouteConstants.ORG.MEMBERS.label,
                    onClick: () => navigate(RouteConstants.ORG.MEMBERS.path!())
                },
                {
                    key: RouteConstants.ORG.DEPARTMENTS.id,
                    label: RouteConstants.ORG.DEPARTMENTS.label,
                    onClick: () => navigate(RouteConstants.ORG.DEPARTMENTS.path!())
                },
                {
                    key: RouteConstants.ORG.ORG_STRUCTURE.id,
                    label: RouteConstants.ORG.ORG_STRUCTURE.label,
                    onClick: () => navigate(RouteConstants.ORG.ORG_STRUCTURE.path())
                },
                {
                    key: RouteConstants.ORG.ROLES.id,
                    label: RouteConstants.ORG.ROLES.label,
                    onClick: () => navigate(RouteConstants.ORG.ROLES.path())
                }
            ]
        },
        {
            key: 'dic',
            label: '数据字典',
            icon: <DatabaseOutlined/>,
            children: [
                {
                    key: RouteConstants.DIC.DICTIONARIES.id,
                    label: RouteConstants.DIC.DICTIONARIES.label,
                    onClick: () => navigate(RouteConstants.DIC.DICTIONARIES.path!())
                },
                {
                    key: RouteConstants.DIC.COUNTRIES.id,
                    label: RouteConstants.DIC.COUNTRIES.label,
                    onClick: () => navigate(RouteConstants.DIC.COUNTRIES.path!())
                },
                {
                    key: RouteConstants.DIC.DISTRICTS.id,
                    label: RouteConstants.DIC.DISTRICTS.label,
                    onClick: () => navigate(RouteConstants.DIC.DISTRICTS.path!())
                },
            ]
        },
        {
            key: 'sys',
            label: '系统管理',
            icon: <DesktopOutlined/>,
            children: [
                {
                    key: RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.id,
                    label: RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.label,
                    onClick: () => navigate(RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.path!())
                },
                {
                    key: RouteConstants.LOG.OPERATION_LOGS.id,
                    label: RouteConstants.LOG.OPERATION_LOGS.label,
                    onClick: () => navigate(RouteConstants.LOG.OPERATION_LOGS.path!())
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