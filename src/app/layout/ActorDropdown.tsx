import {Avatar, Button, Flex, Popover, Space, Tag} from "antd"
import styles from "./standalone-layout.module.less"
import {HomeOutlined, IdcardOutlined, UserOutlined} from "@ant-design/icons"
import {FC, useState} from "react";
import {RouteConstants} from "../../router/route.constants.ts";
import {useAuth, useNavigate} from "@trionesdev/commons-react";
import {TenantOutlined} from "../../icons";

type ActorDropdownProps = {
    tenant?: any
}
export const ActorDropdown: FC<ActorDropdownProps> = ({tenant}) => {
    const navigate = useNavigate()
    const {actor, signOut} = useAuth()
    const [open, setOpen] = useState<boolean>(false)
    return <Popover className={styles.popover} styles={{root: {}, body: {padding: 0, width: 300}}}
                    open={open}
                    arrow={false}
                    onOpenChange={(o) => {
                        setOpen(o)
                    }} placement="bottomRight" title={
        <div className={styles.popoverTitle}>
            <Flex justify={`space-between`}>
                <Space direction={`vertical`} size={`small`}>
                    <div style={{fontSize: 20}}>{tenant?.name}</div>
                    <div>
                        <Tag color={`success`}>剩余XX天</Tag>
                    </div>
                </Space>
                <Avatar icon={<TenantOutlined/>}/>
            </Flex>
        </div>
    } content={<div className={styles.popoverContent}>
        <div className={styles.popoverContentInner}>
            <Flex className={styles.popoverContentMenuItem} justify={`space-between`} onClick={() => {
                navigate(RouteConstants.USER_CENTER.PROFILE.path!())
                setOpen(false)
            }}>
                <Space>
                    <UserOutlined/>
                    <div>个人中心</div>
                </Space>
            </Flex>
            <Flex className={styles.popoverContentMenuItem} justify={`space-between`} onClick={() => {
                navigate(RouteConstants.MEMBER_CENTER.PROFILE.path!())
                setOpen(false)
            }}>
                <Space>
                    <IdcardOutlined/>
                    <div>员工信息</div>
                </Space>
            </Flex>
        </div>
        <Button block={true} color="primary" variant="outlined" onClick={() => {
            signOut?.()
            setOpen(false)
        }}>安全退出</Button>
    </div>}>
        <Space style={{cursor: "default"}}>
            <span>{actor?.nickname}</span>
            <Avatar icon={<UserOutlined/>} src={actor?.avatar}/>
        </Space>
    </Popover>
}
