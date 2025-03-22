import styles from "./profile.module.less"
import {Button, Card, Form, Input, message, Space} from "antd";
import {EditableDesc} from "@trionesdev/antd-react-ext";
import {useRequest} from "ahooks";
import {useState} from "react";
import {tenantApi} from "@apis/tenant";
import {useTenantCenter} from "@app/normal/org/tenant-center/useTenantCenter.ts";
import {useAppConfig} from "@components/app-config";

const TenantProfilePage = () => {
    const appConfig = useAppConfig()
    const {setTenant} = useTenantCenter()
    const [editing, setEditing] = useState(false)
    const [form] = Form.useForm();

    const {run} = useRequest(() => {
        return tenantApi.queryActorTenant()
    }, {
        onSuccess(data) {
            if (data) {
                setTenant?.(data)
                form.setFieldsValue(data)
            }
        }
    })

    const handleSubmit = () => {
        form.validateFields().then(values => {
            tenantApi.updateActorTenant(values)
                .then(async () => {
                    message.success(`修改成功`)
                    setEditing(false)
                    run()
                })
                .catch(async (ex: any) => {
                    console.log(ex)
                    message.error(ex.message)
                })
        })
    }

    return <div className={styles.tenantProfile}>
        <Card title={`企业信息`} extra={<Space>
            {editing ? <Space>
                <Button onClick={() => {
                    setEditing(false)
                }}>取消</Button>
                <Button type={`primary`} onClick={handleSubmit}>保存</Button>
            </Space> : <Button type={`primary`} onClick={() => {
                setEditing(true)
            }}>编辑</Button>}

        </Space>}>
            <Form form={form} labelCol={{flex: '100px'}}>
                {appConfig.multiTenant && <Form.Item label={`企业码`} name={`serial`}>
                    <EditableDesc block={true} editing={false}>

                    </EditableDesc>
                </Form.Item>}
                <Form.Item label={`企业名称`} name={`name`}>
                    <EditableDesc block={true} editing={editing}>
                        <Input/>
                    </EditableDesc>
                </Form.Item>
                <Form.Item label={`介绍`} name={`description`}>
                    <EditableDesc block={true} editing={editing}>
                        <Input.TextArea/>
                    </EditableDesc>
                </Form.Item>
            </Form>
        </Card>
    </div>
}

export default TenantProfilePage
