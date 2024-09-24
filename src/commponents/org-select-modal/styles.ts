import {GlobalToken} from "antd";

export const genOrgStructPanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): any => {
    return {
        [`.${prefixCls}`]: {
            [`&-breadcrumb`]: {
                paddingInline: 12,
                'li:not(:last-child)': {
                    cursor: 'pointer'
                },
                '.ant-breadcrumb-link': {
                    fontSize: 'medium'
                }
            },
            [`&-list`]: {
                [`.${prefixCls}-item`]: {
                    borderRadius: token.borderRadiusLG,
                    [`&:hover`]: {
                        backgroundColor: '#00000012',
                    },
                    [`&-inner`]:{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                        [`.${prefixCls}-item-content`]: {
                            flex: '1 auto',
                            display: 'flex',
                            alignItems: 'center',
                            [`&-title`]: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                flex: '1 auto',
                            },
                            [`&-extra`]: {
                                display: 'flex',
                                alignItems: 'center',
                            }
                        },
                    }

                },
            }
        },
    };
};

export const genOrgTagStyle = (
    prefixCls: string,
): any => {
    return {
        [`.${prefixCls}`]: {
            paddingTop: 4, paddingBottom: 4,
            display: 'flex',
            alignItems: 'center'
        },
    };
};