import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

export const AccountSignIn = () => {
    const [form] = Form.useForm();
    return <Form form={form} layout={"vertical"} size={`large`}>
        <Form.Item name="username">
            <Input prefix={<UserOutlined/>} placeholder={`请输入用户名`}/>
        </Form.Item>
        <Form.Item name="password">
            <Input.Password prefix={<LockOutlined/>} placeholder={`请输入密码`}/>
        </Form.Item>
        <Form.Item>
            <Button type={`primary`} block={true}>登录</Button>
        </Form.Item>
    </Form>
}