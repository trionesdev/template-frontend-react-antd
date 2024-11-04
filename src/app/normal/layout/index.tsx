import {Outlet, useNavigate} from "@trionesdev/commons-react";
import styles from "./normal-layout.module.less"
import {Layout} from "@trionesdev/antd-react-ext";
import {Menu} from "antd";
import {RouteConstants} from "../../../router/route.constants.ts";
import {ApartmentOutlined, DatabaseOutlined, DesktopOutlined} from "@ant-design/icons";

export const NormalLayout = () => {
    const navigate = useNavigate()

    const menuItems: any[] = [
        {
            key: 'org',
            label: '组织管理',
            icon: <ApartmentOutlined/>,
            children: [
                {
                    key: RouteConstants.ORG.MEMBERS.id,
                    label: '成员管理',
                    onClick: () => navigate(RouteConstants.ORG.MEMBERS.path!())
                },
                {
                    key: RouteConstants.ORG.DEPARTMENTS.id,
                    label: '部门管理',
                    onClick: () => navigate(RouteConstants.ORG.DEPARTMENTS.path!())
                },
                {
                    key: RouteConstants.ORG.ORG_STRUCTURE.id,
                    label: '组织结构',
                    onClick: () => navigate(RouteConstants.ORG.ORG_STRUCTURE.path())
                },
                {
                    key: RouteConstants.ORG.ROLES.id,
                    label: '角色管理',
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
                    label: '字典管理',
                    onClick: () => navigate(RouteConstants.DIC.DICTIONARIES.path!())
                },
                {
                    key: 'country-manage',
                    label: '国家字典',
                    onClick: () => navigate(RouteConstants.DIC.COUNTRIES.path!())
                },
                {
                    key: RouteConstants.DIC.DISTRICTS.id,
                    label: '地区字典',
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
                    label: '功能权限',
                    onClick: () => navigate(RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.path!())
                },
                {
                    key: RouteConstants.LOG.LOGIN.id,
                    label: '登录记录',
                    onClick: () => navigate(RouteConstants.LOG.LOGIN.path!())
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