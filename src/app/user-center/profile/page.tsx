import styles from "./profile.module.less"
import {Card, Form, Input, message} from "antd";
import {EditableDesc} from "@trionesdev/antd-react-ext";
import {useRequest} from "ahooks";
import {useState} from "react";
import {tenantApi} from "@apis/tenant";

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

    const handleSubmit = (values: any) => {
        tenantApi.updateActorMember(values)
            .then(async () => {
                message.success(`修改成功`)
                setEditing(false)
                run()
            })
            .catch(async (ex: any) => {
                message.error(ex.message)
            })
    }

    return <div className={styles.userProfile}>
        <Card title={`个人信息`}>
            <Form form={form}>
                <Form.Item label={`昵称`} name={`nickname`}>
                    <EditableDesc editing={editing} editIcon={true} manualChange={true} onChange={(value: any) => {
                        handleSubmit({nickname: value})
                    }}>
                        <Input/>
                    </EditableDesc>
                </Form.Item>
                <Form.Item label={`邮箱`} name={`email`}>
                    <EditableDesc editing={editing} editIcon={true} manualChange={true} onChange={(value: any) => {
                        handleSubmit({email: value})
                    }}>
                        <Input/>
                    </EditableDesc>
                </Form.Item>
            </Form>
        </Card>
    </div>
}