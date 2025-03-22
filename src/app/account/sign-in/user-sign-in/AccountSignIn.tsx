import {Alert, Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {FC, useState} from "react";
import {useAuth, useNavigate} from "@trionesdev/commons-react";
import styles from "../sign-in.module.less"
import {userAccountApi, userApi} from "@apis/backend/user";
import {RouteConstants} from "../../../../router/route.constants.ts";
import {tenantApi} from "@apis/tenant";

type AccountSignInProps = {
    onTypeChange?: (type: string) => void;
}
export const AccountSignIn: FC<AccountSignInProps> = ({onTypeChange}) => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const {setActor} = useAuth()
    const [error, setError] = useState('');
    const handleSignIn = () => {
        form.validateFields().then((values: any) => {
            userAccountApi.accountSignIn(values).then(async () => {
                message.success('登录成功')
                tenantApi.findActorProfile().then((actor:any) => {
                    setActor?.(actor)
                    if (actor?.tenantId){
                        navigate(`/`)
                    }else {
                     navigate(RouteConstants.ORG.CREATE_TENANT.path())
                    }
                })
            }).catch((ex: any) => {
                setError(ex.message)
            })
        })
    }

    return <Form form={form} layout={"vertical"} size={`large`}>
        <Form.Item name="account" required={true} rules={[{required: true, message: '请输入用户名'}]}>
            <Input prefix={<UserOutlined/>} placeholder={`请输入用户名`} allowClear={true}/>
        </Form.Item>
        <Form.Item name="password" required={true} rules={[{required: true, message: '请输入密码'}]}>
            <Input.Password prefix={<LockOutlined/>} placeholder={`请输入密码`} allowClear={true}/>
        </Form.Item>
        {error &&
            <Form.Item><Alert type={`error`} message={error} closable={true} onClose={() => setError('')}/></Form.Item>}
        <Form.Item>
            <Button className={styles.submit} type={`primary`} block={true} onClick={handleSignIn}>登录</Button>
            <Button block={true} type={`link`} onClick={() => {
                onTypeChange?.('sms')
            }}>使用短信登录</Button>
        </Form.Item>

    </Form>
}
