import {Outlet} from "@trionesdev/commons-react";
import {Avatar, Button, Layout, Menu, Space, Tag} from "antd";
import styles from "./standalone-layout.module.less"
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useNavMenus} from "../../hooks/useNavMenus.tsx";
import NavTabs from "@components/nav-tabs";
import {tenantApi} from "@apis/tenant";
import {ActorDropdown} from "@app/layout/ActorDropdown.tsx";

export const StandAloneLayout = () => {

    const {generalMenus} = useNavMenus()
    const [collapsed, setCollapsed] = useState(false)
    const menuItems: any[] = [...generalMenus]
    const [tenant, setTenant] = useState<any>()

    useEffect(() => {
        tenantApi.queryActorTenant().then((res: any) => {
            setTenant(res)
        })
    }, [])

    return <Layout className={styles.standaloneLayout}>
        <Layout.Sider collapsed={collapsed} width={250}>
            <div className={styles.standaloneLayoutSiderWraper}>
                <div className={styles.logo} style={{justifyContent: collapsed ? 'center' : 'normal'}}>
                    <Space>
                        <Avatar shape={`square`} src={tenant?.logo}/>
                        {!collapsed && <span style={{fontSize: 18}}>{tenant?.name ?? '小牛工单'}</span>}
                    </Space>
                </div>
                <div className={styles.menu}>
                    <Menu mode="inline" theme={'dark'} items={menuItems}/>
                </div>
            </div>
        </Layout.Sider>
        <Layout>
            <Layout.Header className={styles.standaloneLayoutHeader}>
                <Button type={'text'} icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}/>
                <Space>
                    <Tag>正常</Tag>
                    <ActorDropdown tenant={tenant}/>
                </Space>
            </Layout.Header>
            <NavTabs/>
            <Layout.Content style={{overflowY: "auto", padding: 4}}>
                <Outlet/>
            </Layout.Content>
        </Layout>
    </Layout>
}
