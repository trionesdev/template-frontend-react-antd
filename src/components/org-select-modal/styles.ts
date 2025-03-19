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
                maxHeight:400,
                overflowY: 'auto',
                [`.${prefixCls}-item`]: {
                    borderRadius: token.borderRadiusLG,
                    cursor: 'pointer',
                    [`&:hover`]: {
                        backgroundColor: '#00000012',
                    },
                    [`&-inner`]: {
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

export const genOrgSelectStyle = (prefixCls: string, token: GlobalToken,): any => {
    return {
        [`.${prefixCls}`]: {},
        [`.${prefixCls}-dropdown`]: {
            backgroundColor: '#fff',
            '.ant-list-item': {
                borderRadius: token.borderRadiusLG,
                padding: '8px 16px',
                [`&:hover`]: {
                    backgroundColor: '#00000012',
                },
                '.org-option': {
                    display: 'flex',
                    width: '100%',
                    gap: '8px',
                    cursor: 'pointer',
                    '.org-option-content': {
                        flex: '1 auto',
                        display: 'flex',
                        alignItems: 'center',
                        '.org-option-meta': {
                            color: 'rgba(23, 26, 29, 0.4)',
                            fontSize: '12px'
                        }
                    }
                }
            }
        }
    }
}
