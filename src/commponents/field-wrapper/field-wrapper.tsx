import React, {FC} from "react";
import {useCssInJs} from "@trionesdev/antd-react-ext";
import {genFieldWrapperStyle} from "./styles";
import classNames from "classnames";
import {SizeType} from "antd/es/config-provider/SizeContext";

type FieldWrapperProps = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    size?: SizeType
    [key: string]: any
};

export const FieldWrapper: FC<FieldWrapperProps> = ({className, style, size, children, ...props}) => {
    const prefixCls = 'triones-ant-field-wrapper';
    const {hashId, wrapSSR} = useCssInJs({
        prefix: prefixCls,
        styleFun: genFieldWrapperStyle,
    });

    return wrapSSR(
        <div {...props} style={{...style, minHeight: 31}}
             className={classNames(prefixCls, className, {
                 [`${prefixCls}-sm`]: size === 'small',
                 [`${prefixCls}-lg`]: size === 'large',
             }, hashId)}>{children}</div>
    )
}
