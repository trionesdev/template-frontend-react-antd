import {Outlet, useAuth, useNavigate} from "@trionesdev/commons-react";
import {Avatar, Button, Dropdown, Layout, Menu, Space} from "antd";
import styles from "./standalone-layout.module.less"
import {LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";
import {RouteConstants} from "../../router/route.constants.ts";
import {useState} from "react";
import NavTags from "../../commponents/nav-tags";
import {useNavMenus} from "../../hooks/useNavMenus.tsx";

export const StandAloneLayout = () => {
    const navigate = useNavigate()
    const {generalMenus} = useNavMenus()
    const {actor, signOut} = useAuth()
    const [collapsed, setCollapsed] = useState(false)

    const menuItems: any[] = [...generalMenus]

    return <Layout className={styles.standaloneLayout}>
        <Layout.Sider collapsed={collapsed}>
            <div className={styles.standaloneLayoutSiderWraper}>
                <div className={styles.logo}>TrionesDev</div>
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
                    <Dropdown menu={{
                        items: [
                            {
                                key: `profile`,
                                label: `个人中心`,
                                icon: <UserOutlined/>,
                                onClick: () => {
                                    navigate(RouteConstants.USER_CENTER.PROFILE.path!())
                                }
                            },
                            {
                                key: `logout`,
                                label: `退出登录`,
                                icon: <LogoutOutlined/>,
                                onClick: () => {
                                    signOut?.()
                                }
                            }
                        ]
                    }}>
                        <Space style={{cursor: "default"}}><Avatar icon={<UserOutlined/>} src={actor?.avatar}/>
                            <span>{actor?.nickname}</span>
                        </Space>
                    </Dropdown>
                </Space>
            </Layout.Header>
            <NavTags/>
            <Layout.Content style={{overflowY: "auto", padding: 4}}>
                <Outlet/>
            </Layout.Content>
        </Layout>
    </Layout>
}