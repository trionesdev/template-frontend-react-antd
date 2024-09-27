import React, {FC, MouseEventHandler} from "react";
import {useCssInJs} from "@trionesdev/antd-react-ext";
import {genFieldWrapperStyle} from "./styles";
import classNames from "classnames";
import {SizeType} from "antd/es/config-provider/SizeContext";

type FieldWrapperProps = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    value?: any
    size?: SizeType
    onClick?: MouseEventHandler<HTMLDivElement> | undefined
    allowClear?: boolean
    onClear?: () => void
    [key: string]: any
};

export const FieldWrapper: FC<FieldWrapperProps> = ({
                                                        className, style, size, children,
                                                        value,
                                                        onClick,
                                                        allowClear, onClear,
                                                        ...props
                                                    }) => {
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
             }, hashId)}

        ><span style={{flex: 1}} onClick={onClick}>{children}</span>
            {(value && allowClear) && <span className={classNames(`ant-input-suffix`, hashId)}>
                <span className="ant-input-clear-icon" role="button" onClick={onClear}>
                <span role="img"
                      aria-label="close-circle"
                      className="anticon anticon-close-circle"><svg
                    fillRule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em"
                    height="1em" fill="currentColor" aria-hidden="true"><path
                    d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path></svg>
            </span>
                </span>
            </span>}
        </div>
    )
}
