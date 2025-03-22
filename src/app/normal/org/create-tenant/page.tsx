import {Layout, PageHeader} from "@trionesdev/antd-react-ext";
import {Button, Form, Input, message, Space} from "antd";
import {tenantApi} from "@apis/tenant";
import {useNavigate} from "@trionesdev/commons-react";

const CreateTenantPage = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const handleCreateTenant = () => {
        form.validateFields().then((values: any) => {
            tenantApi.createTenant(values).then(async () => {
                message.success('操作成功')
                navigate('/')
            }).catch(async (ex) => {
                message.error(ex.message)
            })
        })
    }

    return <>
        <Layout direction={`vertical`}>
            <Layout.Item>
                <PageHeader title={<Space>
                    <span>创建企业</span>
                </Space>}/>
            </Layout.Item>
            <Layout.Item auto={true}>
                <div style={{padding: '50px'}}>
                    <div style={{maxWidth: 500, marginRight: "auto", marginLeft: "auto"}}>
                        <Form form={form} layout={`vertical`}>
                            <Form.Item label={`企业名称`} name={`name`}>
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" block={true} onClick={handleCreateTenant}>创建</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout.Item>
        </Layout>
    </>
}
export default CreateTenantPage
