import styles from "./sign-in.module.less"
import {Tabs} from "antd";
import BgImage from '../assests/bg.png';
import {useAppConfig} from "@components/app-config";
import {UserSignIn} from "@app/account/sign-in/user-sign-in";
import {TenantMemberSignIn} from "@app/account/sign-in/TenantAccountSignIn.tsx";

export const SignInPage = () => {
    const appConfig = useAppConfig();
    const now = new Date();
    const year = now.getFullYear();

    const handleItems = () => {
        const items = [];
        if (appConfig.multiTenant) {
            items.push({
                key: 'account-sign-in',
                label: '账号登录',
                disabled: true,
                children: <div style={{padding: '20px 0px'}}><UserSignIn/></div>,
            })
        }
        items.push({
            key: 'tenant-account-sign-in',
            label: '员工账户登录',
            children: <div style={{padding: '20px 0px'}}><TenantMemberSignIn/></div>,
        })
        return items;
    }

    return <div className={styles.signInPage} style={{backgroundImage: `url(${BgImage})`}}>
        <div className={styles.main}>
            <div className={styles.left}>
                <div style={{transform: 'translateY(-200%) translateX(-50%)'}}>
                    <div className={styles.title}>TrionesDev Admin</div>
                    <div>中台后台管理系统快速开发平台</div>
                </div>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formPanel}>
                    <Tabs items={handleItems()} />
                </div>
            </div>
        </div>
        <div className={styles.footer}>TrionesDev ©2015-${year} TrionesDev All Rights Reserved.</div>
    </div>
}