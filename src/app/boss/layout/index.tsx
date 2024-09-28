import {Outlet} from "@trionesdev/commons-react";
import styles from "./boss-layout.module.less"
import {Layout} from "@trionesdev/antd-react-ext";
import {Menu} from "antd";

export const BossLayout = () => {


    const menuItems: any[] = [

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