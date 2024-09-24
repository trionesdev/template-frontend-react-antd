import {AccountSignIn} from "@app/account/sign-in/AccountSignIn.tsx";
import styles from "./sign-in.module.less"
import {Col, Row, Tabs} from "antd";
import {Layout} from "@trionesdev/antd-react-ext";

export const SignInPage = () => {
    return <Layout direction={`vertical`} className={styles.signInPage}>
        <Layout.Item auto={true}>
            <Row style={{height: `100%`}}>
                <Col span={12}>col-6</Col>
                <Col span={12} className={styles.formContainer}>
                    <div className={styles.formPanel}>
                        <Tabs items={[{
                            key: 'account-sign-in',
                            label: '账号登录',
                            children: <div style={{padding: '20px 0px'}}><AccountSignIn/></div>,
                        }]}/>
                    </div>
                </Col>
            </Row>
        </Layout.Item>
        <Layout.Item>
            <div className={styles.footer}>TrionesDev ©2015-Now TrionesDev All Rights Reserved.</div>
        </Layout.Item>
    </Layout>
}