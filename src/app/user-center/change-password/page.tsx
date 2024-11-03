import styles from "./change-password.module.less"
import {Button, Card, Form, Input, message, Space} from "antd";
import {tenantApi} from "@apis/tenant";

export const ChangePasswordPage = () => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values: any) => {
            tenantApi.changeActorPassword(values).then(async () => {
                message.success(`修改成功`)
            }).catch(async (ex: any) => {
                message.error(ex.message)
            })
        })
    }

    return <div className={styles.changePassword}>
        <Card title={`修改密码`} extra={<Space>
            <Button type={`primary`} onClick={handleSubmit}>提交</Button>
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