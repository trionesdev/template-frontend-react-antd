import {FC} from "react";
import {Avatar, Tag} from "antd";
import {useCssInJs} from "@trionesdev/antd-react-ext";
import {genOrgTagStyle} from "./styles";
import classNames from "classnames";
import {ApartmentOutlined, UserOutlined} from "@ant-design/icons";

type OrgNodeTagProps = {
    orgNode: {
        id: string,
        name: string
        type: string
        avatar?: string
    }
    onClose?: (id: string) => void
}
export const OrgNodeTag: FC<OrgNodeTagProps> = ({orgNode, onClose}) => {
    const prefixCls = `org-node-tag`
    const {wrapSSR, hashId} = useCssInJs({prefix: prefixCls, styleFun: genOrgTagStyle})
    return wrapSSR(
        <Tag className={classNames(prefixCls, hashId)} bordered={false} closable
             icon={orgNode.type == 'MEMBER' ?
                 <Avatar shape={`square`} size={`small`} style={{marginRight: 8}} icon={<UserOutlined/>}
                         src={orgNode.avatar}/> :
                 <Avatar shape={`square`} size={`small`} style={{marginRight: 8}} icon={<ApartmentOutlined/>}/>}
             onClose={() => onClose?.(orgNode.id)}
        >
            {orgNode.name}
        </Tag>
    )
}