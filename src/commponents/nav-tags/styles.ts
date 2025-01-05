import { GlobalToken } from 'antd';

export const genNavTagsStyle = (
    prefixCls: string,
    token: GlobalToken,
): any => {
    return {
        [`.${prefixCls}`]: {
            boxSizing: 'border-box',
            backgroundColor: 'white',
            borderBottom: '1px solid #0000000d',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            overflowX: 'hidden',
            flexShrink: 0,
            [`&-wrapper`]: {
                display: 'flex',
                padding: '8px 4px',
                width: 'fit-content',
                [`.ant-tag`]: {
                    padding: '0px 8px',
                    borderRadius: 0,
                    cursor: 'pointer',
                },
                [`.active-tag`]: {
                    backgroundColor: '#1677FF',
                    border: '1px solid #1677FF',
                    color: 'white',
                    [`.anticon`]: {
                        color: 'white',
                    },
                },
            },
        },
    };
};