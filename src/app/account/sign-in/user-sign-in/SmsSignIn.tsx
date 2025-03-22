import {Alert, Button, Form, Input, message} from "antd";
import {LockOutlined, MobileOutlined, UserOutlined} from "@ant-design/icons";
import {tenantApi} from "@apis/tenant";
import {FC, useState} from "react";
import {useAuth, useNavigate} from "@trionesdev/commons-react";
import styles from "../sign-in.module.less"
import {userAccountApi} from "@apis/backend/user";

type SmsSignInProps = {
    onTypeChange?: (type: string) => void;
}
export const SmsSignIn: FC<SmsSignInProps> = ({onTypeChange}) => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const {setActor} = useAuth()
    const [error, setError] = useState('');
    const handleSignIn = () => {
        form.validateFields().then((values: any) => {
            userAccountApi.accountSignIn(values).then(async () => {
                message.success('登录成功')
                tenantApi.queryActorMember().then((actor: any) => {
                    setActor?.(actor)
                    navigate(`/`)
                })
            }).catch((ex: any) => {
                setError(ex.message)
            })
        })
    }

    return <Form form={form} layout={"vertical"} size={`large`}>
        <Form.Item name="phone" required={true} rules={[{required: true, message: '请输入用户名'}]}>
            <Input prefix={<MobileOutlined />} placeholder={`请输入手机号码`} allowClear={true}/>
        </Form.Item>
        <Form.Item name="password" required={true} rules={[{required: true, message: '请输入密码'}]}>
            <Input.Password prefix={<LockOutlined/>} placeholder={`请输入密码`} allowClear={true}/>
        </Form.Item>
        {error &&
            <Form.Item><Alert type={`error`} message={error} closable={true} onClose={() => setError('')}/></Form.Item>}
        <Form.Item>
            <Button className={styles.submit} type={`primary`} block={true} onClick={handleSignIn}>登录</Button>
            <Button block={true} type={`link`} onClick={() => {
                onTypeChange?.('account')
            }}>使用账户登录</Button>
        </Form.Item>

    </Form>
}