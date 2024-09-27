import {CSSInterpolation} from "@ant-design/cssinjs";
import {GlobalToken} from "antd";

export const genFieldWrapperStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            boxSizing: 'border-box',
            border: `1px solid ${token.colorBorder}`,
            borderRadius: token.borderRadius,
            paddingBlock: 4,
            paddingInline: 11,
            display: 'inline-flex',
            width: '100%',
            '&:hover': {
                border: `1px solid ${token.colorPrimaryBorderHover}`,
            },
            [`&-sm`]: {
                paddingBlock: 0,
                paddingInline: 11,
            },
            [`&-lg`]: {
                paddingBlock: 7,
                paddingInline: 11,
            },
            '.ant-input-suffix': {
                marginLeft: 4,
                display: 'flex',
                flex: 'none',
                alignItems: 'center',
                '.ant-input-clear-icon': {
                    margin: 0,
                    color: 'rgba(0, 0, 0, 0.25)',
                    fontSize: 12,
                    verticalAlign: -1,
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                    '&:hover':{
                        color:'rgba(0, 0, 0, 0.45)'
                    }
                }
            }
        },
    };
};
