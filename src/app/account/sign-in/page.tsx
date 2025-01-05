import {AccountSignIn} from "@app/account/sign-in/AccountSignIn.tsx";
import styles from "./sign-in.module.less"
import {Tabs} from "antd";
import BgImage from '../assests/bg.png';

export const SignInPage = () => {
    return <div className={styles.signInPage} style={{backgroundImage: `url(${BgImage})`}}>
        <div className={styles.main}>
            <div className={styles.left}>
                <div>
                    <div className={styles.title}>天玑·物联网平台</div>
                </div>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formPanel}>
                    <Tabs items={[{
                        key: 'account-sign-in',
                        label: '账号登录',
                        children: <div style={{ padding: '20px 0px' }}><AccountSignIn /></div>,
                    }]} />
                </div>
            </div>
        </div>
        <div className={styles.footer}>TrionesDev ©2015-Now TrionesDev All Rights Reserved.</div>
    </div>
}