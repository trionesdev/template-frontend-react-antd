import FieldWrapper from "../field-wrapper";
import {Button, Flex, Modal} from "antd";
import {useState} from "react";
import {icons} from "./icons.tsx";
import _ from "lodash";

export const IconSelect = () => {
    const [innerValue, setInnerValue] = useState<any>()
    const [open, setOpen] = useState(false)
    return <>
        <Modal open={open} title={`图标选择`} footer={null} onClose={() => setOpen(false)}
               onCancel={() => setOpen(false)}>
            <Flex wrap gap="small">
                {_.map(icons, (icon, key) => {
                    return <Button type={'text'} icon={icon} onClick={() => {
                        setInnerValue(key)
                        setOpen(false)
                    }}/>
                })}
            </Flex>
        </Modal>
        <FieldWrapper value={innerValue} onClick={() => setOpen(true)} allowClear={true}
                      onClear={() => setInnerValue(undefined)}>
            {(innerValue && _.get(icons, innerValue)) ? <>{_.get(icons, innerValue)}</> : null}
        </FieldWrapper>
    </>
}