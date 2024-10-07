import styles from "./change-password.module.less"
import {Button, Card, Form, Input, Space} from "antd";

export const ChangePasswordPage = () => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values: any) => {

        })
    }

    return <div className={styles.changePassword}>
        <Card title={`修改密码`} size={'small'}   extra={<Space>
            <Button type={`primary`} onClick={() => {

            }}>提交</Button>
        </Space>}>
            <div style={{width: 500, margin: '0 auto'}}>
                <Form form={form} labelCol={{flex: '100px'}}>
                    <Form.Item label={"旧密码"} name={"oldPassword"} required={true}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item label={"新密码"} name={"newPassword"} required={true}>
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </div>
        </Card>
    </div>
}