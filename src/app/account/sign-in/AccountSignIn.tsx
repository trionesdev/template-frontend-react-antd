import {Alert, Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {tenantAccountApi, tenantApi} from "@apis";
import {useState} from "react";
import {useAuth, useNavigate} from "@trionesdev/commons-react";

export const AccountSignIn = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const {setActor} = useAuth()
    const [error, setError] = useState('');
    const handleSignIn = () => {
        form.validateFields().then((values: any) => {
            tenantAccountApi.accountSignIn(values).then(async () => {
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
        <Form.Item name="account" required={true} rules={[{required: true, message: '请输入用户名'}]}>
            <Input prefix={<UserOutlined/>} placeholder={`请输入用户名`}/>
        </Form.Item>
        <Form.Item name="password" required={true} rules={[{required: true, message: '请输入密码'}]}>
            <Input.Password prefix={<LockOutlined/>} placeholder={`请输入密码`}/>
        </Form.Item>
        {error &&
            <Form.Item><Alert type={`error`} message={error} closable={true} onClose={() => setError('')}/></Form.Item>}
        <Form.Item>
            <Button type={`primary`} block={true} onClick={handleSignIn}>登录</Button>
        </Form.Item>
    </Form>
}