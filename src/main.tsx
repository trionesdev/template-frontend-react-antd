import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import {AppRouter} from './router';
import './index.css'
import './index.less'
import {AuthProvider, PermissionProvider} from "@trionesdev/commons-react";
import {legacyLogicalPropertiesTransformer, StyleProvider} from "@ant-design/cssinjs";
import {AppConfigProvider} from "./commponents/app-config";
import {StorageUtils} from "@trionesdev/browser-commons";
import {tenantApi} from "@apis";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
            <ConfigProvider locale={zhCN}>
                <AppConfigProvider defaultConfig={{multiTenant: false, selfHost: true}}>
                    <AuthProvider authRequest={async () => {
                        if (StorageUtils.getTrionesUserToken()) {
                            return tenantApi.queryActorMember().then((actor: any) => {
                                return actor
                            })
                        } else {
                            return Promise.reject(null)
                        }
                    }}>
                        <PermissionProvider
                            policyRequest={async () => {
                                console.log("permissionRequest");
                                return {};
                            }}>
                            <AppRouter/>
                        </PermissionProvider>
                    </AuthProvider>
                </AppConfigProvider>
            </ConfigProvider>
        </StyleProvider>
    </StrictMode>,
)
