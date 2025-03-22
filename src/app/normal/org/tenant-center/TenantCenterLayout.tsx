import {useRequest} from "ahooks";
import styles from "./tenant-center.module.less"
import {Card, Menu, message, Space} from "antd";
import {Outlet, useMatches, useNavigate} from "@trionesdev/commons-react";
import {AvatarEditor} from "@trionesdev/antd-react-ext";
import {ossApi, tenantApi} from "@apis/tenant";
import {RouteConstants} from "../../../../router/route.constants.ts";
import {TenantOutlined} from "../../../../icons";
import {TenantCenterProvider} from "@app/normal/org/tenant-center/TenantCenterProvider.tsx";
import {useTenantCenter} from "@app/normal/org/tenant-center/useTenantCenter.ts";
import {useAppConfig} from "@components/app-config";

const TenantCenterLayout = () => {
    return <TenantCenterProvider>
        <TenantCenterLayoutInner/>
    </TenantCenterProvider>
}

const TenantCenterLayoutInner = () => {
    const appConfig = useAppConfig()
    const navigate = useNavigate()
    const matches = useMatches();
    const {tenant, setTenant} = useTenantCenter()

    useRequest(() => {
        return tenantApi.queryActorTenant()
    }, {
        onSuccess(data: any) {
            setTenant?.(data)
        }
    })

    return <div className={styles.tenantCenterLayout}>
        <div className={styles.tenantCenterLayoutWrapper}>
            <div className={styles.tenantCenterLayoutWrapperSider}>
                <Card cover={<AvatarEditor size={250} value={tenant?.logo} uploadRequest={(file: File) => {
                    const formData = new FormData()
                    formData.append('file', file)
                    return ossApi.formDataUpload(formData).then((res: any) => {
                        return res.url
                    }).catch(async ex => {
                        message.error(ex.message)
                    })
                }} onChange={async (url) => {
                    await tenantApi.updateActorTenant({logo: url})
                }}/>}>
                    <Card.Meta title={tenant?.name} description={<Space>
                        {appConfig.multiTenant && <div>企业码: {tenant?.serial}</div>}
                    </Space>}/>
                </Card>
                <Menu selectedKeys={[matches[matches.length - 1].id]} items={[
                    {
                        key: RouteConstants.TENANT_CENTER.PROFILE.id,
                        label: '企业信息',
                        icon: <TenantOutlined/>,
                        onClick: () => {
                            navigate(RouteConstants.TENANT_CENTER.PROFILE.path())
                        }
                    }
                ]}/>
            </div>
            <div className={styles.tenantCenterLayoutWrapperContent}>
                <Outlet/>
            </div>
        </div>
    </div>
}
export default TenantCenterLayout
