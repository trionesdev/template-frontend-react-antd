import {AppToolbar, Layout} from "@trionesdev/antd-react-ext";
import {Outlet, useAuth, useNavigate} from "@trionesdev/commons-react";
import {Avatar, Dropdown, Space} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {RouteConstants} from "../router/route.constants.ts";

export const MainLayout = () => {
    const navigate = useNavigate()
    const {actor, signOut} = useAuth()
    return <Layout direction={`vertical`}>
        <Layout.Item>
            <AppToolbar title={<Space style={{cursor: "pointer"}} onClick={() => {
                navigate('/')
            }}>TrionesDev</Space>} extra={<Space>
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
            </Space>}/>
        </Layout.Item>
        <Layout.Item auto={true} style={{overflow: "auto"}}>
            <Outlet/>
        </Layout.Item>
    </Layout>
}