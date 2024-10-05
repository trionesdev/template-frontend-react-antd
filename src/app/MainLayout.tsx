import {AppToolbar, Layout} from "@trionesdev/antd-react-ext";
import {Outlet, useNavigate} from "@trionesdev/commons-react";
import {Avatar, Dropdown, Space} from "antd";
import {KeyOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {StorageUtils} from "@trionesdev/browser-commons";
import {RouteConstants} from "../router/route.constants.ts";

export const MainLayout = () => {
    const navigate = useNavigate()
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
                            key: `modify-password`,
                            label: `修改密码`,
                            icon: <KeyOutlined/>
                        },
                        {
                            key: `logout`,
                            label: `退出登录`,
                            icon: <LogoutOutlined/>,
                            onClick: () => {
                                StorageUtils.removeTenantUserToken();
                                navigate(RouteConstants.ACCOUNT.SIGN_IN.path!())
                            }
                        }
                    ]
                }}>
                    <Space style={{cursor: "default"}}><Avatar icon={<UserOutlined/>}/>
                        <span>TrionesUser</span>
                    </Space>
                </Dropdown>
            </Space>}/>
        </Layout.Item>
        <Layout.Item auto={true}>
            <Outlet/>
        </Layout.Item>
    </Layout>
}