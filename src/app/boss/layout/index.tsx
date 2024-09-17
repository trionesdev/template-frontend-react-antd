import {Outlet, useNavigate} from "@trionesdev/commons-react";
import styles from "./boss-layout.module.less"
import {Layout} from "@trionesdev/antd-react-ext";
import {Menu} from "antd";
import {RouteConstants} from "../../../router/route.constants.ts";

export const BossLayout = () => {
    const navigate = useNavigate()

    const menuItems: any[] = [
        {
            key: 'perm',
            label: '权限资源',
            children: [
                {
                    key: RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.id,
                    label: '功能权限',
                    onClick: () => navigate(RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.path!())
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