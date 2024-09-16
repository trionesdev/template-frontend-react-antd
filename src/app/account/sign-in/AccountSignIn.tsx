import {Form, Input} from "antd";

export const AccountSignIn = () => {
    const [form] = Form.useForm();
    return <Form form={form} layout={"vertical"}>
        <Form.Item name="username">
            <Input placeholder={`请输入用户名`}/>
        </Form.Item>
        <Form.Item name="password">
            <Input.Password placeholder={`请输入密码`}/>
        </Form.Item>
    </Form>
}