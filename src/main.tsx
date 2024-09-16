import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import {AppRouter} from './router';
import './index.css'
import './index.less'
import {AuthProvider, PermissionProvider} from "@trionesdev/commons-react";
import {legacyLogicalPropertiesTransformer, StyleProvider} from "@ant-design/cssinjs";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
            <ConfigProvider locale={zhCN}>
                <AuthProvider authRequest={async () => {
                    return null
                }}>
                    <PermissionProvider
                        policyRequest={async () => {
                            console.log("permissionRequest");
                            return {};
                        }}>
                        <AppRouter/>
                    </PermissionProvider>
                </AuthProvider>
            </ConfigProvider>
        </StyleProvider>
    </StrictMode>,
)
