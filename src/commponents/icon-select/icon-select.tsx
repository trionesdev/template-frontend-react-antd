import FieldWrapper from "../field-wrapper";
import {Button, Flex, Modal} from "antd";
import {FC, useEffect, useState} from "react";
import {icons} from "./icons.tsx";
import _ from "lodash";

type IconSelectProps = {
    value?: string
    onChange?: (value: string) => void
}
export const IconSelect: FC<IconSelectProps> = ({value, onChange}) => {
    const [innerValue, setInnerValue] = useState<any>(value)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!_.isEqual(value, innerValue)) {
            setInnerValue(value)
        }
    }, [value]);

    useEffect(() => {
        onChange?.(innerValue)
    }, [innerValue]);

    return <>
        <Modal open={open} title={`图标选择`} footer={null} onClose={() => setOpen(false)}
               onCancel={() => setOpen(false)}>
            <Flex wrap gap="small">
                {_.map(icons, (icon, key) => {
                    return <Button key={key} color={key === innerValue ? 'primary' : 'default'}
                                   variant={key === innerValue ? 'outlined' : 'link'} icon={icon}
                                   onClick={() => {
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