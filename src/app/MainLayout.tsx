import {AppToolbar, Layout} from "@trionesdev/antd-react-ext";
import {Outlet, useNavigate} from "@trionesdev/commons-react";
import {Avatar, Dropdown, Space} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {StorageUtils} from "@trionesdev/browser-commons";
import {RouteConstants} from "../router/route.constants.ts";

export const MainLayout = () => {
    const navigate = useNavigate()
    return <Layout direction={`vertical`}>
        <Layout.Item>
            <AppToolbar title={`TrionesDev`} extra={<Space>
                <Dropdown menu={{
                    items: [{
                        key: `logout`,
                        label: `退出登录`,
                        icon: <LogoutOutlined/>,
                        onClick: () => {
                            StorageUtils.removeTenantUserToken();
                            navigate(RouteConstants.ACCOUNT.SIGN_IN.path!())
                        }
                    }]
                }}>
                    <Space><Avatar icon={<UserOutlined/>}/>
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