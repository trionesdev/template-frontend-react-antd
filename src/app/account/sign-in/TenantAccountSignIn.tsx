import {Alert, Button, Form, Input, message} from "antd";
import {FieldNumberOutlined, IdcardOutlined, LockOutlined} from "@ant-design/icons";
import {tenantAccountApi, tenantApi} from "@apis/tenant";
import {useState} from "react";
import {useAuth, useNavigate} from "@trionesdev/commons-react";
import styles from "./sign-in.module.less"
import {useAppConfig} from "@components/app-config";

export const TenantMemberSignIn = () => {
    const navigate = useNavigate()
    const appConfig = useAppConfig()
    const [form] = Form.useForm();
    const {setActor} = useAuth()
    const [error, setError] = useState('');
    const handleSignIn = () => {
        form.validateFields().then((values: any) => {
            tenantAccountApi.accountSignIn(values).then(async () => {
                message.success('登录成功')
                tenantApi.findActorProfile().then((actor: any) => {
                    setActor?.(actor)
                    navigate(`/`)
                })
            }).catch((ex: any) => {
                setError(ex.message)
            })
        })
    }

    return <Form form={form} layout={"vertical"} size={`large`}>
        {appConfig.multiTenant &&
            <Form.Item name="tenantSerial" required={true} rules={[{required: true, message: '请输入企业码'}]}>
                <Input prefix={<FieldNumberOutlined/>} placeholder={`请输入企业码`} allowClear={true}/>
            </Form.Item>}
        <Form.Item name="account" required={true} rules={[{required: true, message: '请输入用户名'}]}>
            <Input prefix={<IdcardOutlined/>} placeholder={`请输入用户名`} allowClear={true}/>
        </Form.Item>
        <Form.Item name="password" required={true} rules={[{required: true, message: '请输入密码'}]}>
            <Input.Password prefix={<LockOutlined/>} placeholder={`请输入密码`} allowClear={true}/>
        </Form.Item>
        {error &&
            <Form.Item><Alert type={`error`} message={error} closable={true} onClose={() => setError('')}/></Form.Item>}
        <Form.Item>
            <Button className={styles.submit} type={`primary`} block={true} onClick={handleSignIn}>登录</Button>
        </Form.Item>
    </Form>
}
