import styles from "./profile.module.less"
import {Button, Card, Form, Input, message, Space} from "antd";
import {EditableDesc} from "@trionesdev/antd-react-ext";
import {useRequest} from "ahooks";
import {tenantApi} from "@apis";
import {useState} from "react";

export const UserProfilePage = () => {
    const [editing, setEditing] = useState(false)
    const [form] = Form.useForm();

    const {run} = useRequest(() => {
        return tenantApi.queryActorMember()
    }, {
        onSuccess(data) {
            form.setFieldsValue(data)
        }
    })

    const handleSubmit = () => {
        form.validateFields().then((values: any) => {
            tenantApi.updateActorMember(values)
                .then(async () => {
                    message.success(`修改成功`)
                    setEditing(false)
                    run()
                })
                .catch(async (ex: any) => {
                    message.error(ex.message)
                })
        }).catch(async (ex: any) => {
            message.error(ex.message)
        })
    }

    return <div className={styles.userProfile}>
        <Card title={`个人信息`}  extra={<Space>
            {editing ? <Space>
                <Button onClick={() => {
                    setEditing(false)
                }}>取消</Button>
                <Button type={`primary`} onClick={handleSubmit}>保存</Button>
            </Space> : <Button type={`primary`} onClick={() => {
                setEditing(true)
            }}>修改</Button>}
        </Space>}>
            <Form form={form}>
                <Form.Item label={`昵称`} name={`nickname`}>
                    <EditableDesc editing={editing}>
                        <Input/>
                    </EditableDesc>
                </Form.Item>
                <Form.Item label={`邮箱`} name={`email`}>
                    <EditableDesc editing={editing}>
                        <Input/>
                    </EditableDesc>
                </Form.Item>
            </Form>
        </Card>
    </div>
}