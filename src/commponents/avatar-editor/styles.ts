import {GlobalToken} from "antd";
import {CSSInterpolation} from "@ant-design/cssinjs";

export const genAvatarEditorStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            [`&-avatar`]: {
                position: 'relative',
                [`&-mask`]: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all .3s',
                    '&:hover': {
                        background: 'rgba(0,0,0,.8)',
                    },
                    'label': {
                        fontSize: '30px',
                        '.anticon': {
                            cursor: 'pointer'
                        }
                    }
                }
            },
            '.avatar-uploader': {
                width: '100%',
                height: '100%',
                '.ant-upload-select': {
                    width: '100%!important',
                    height: '100%!important',
                    '.ant-upload': {
                        fontSize: '30px',
                        color: '#0000004a'
                    }
                }
            }
        }
    }
}


export const genAvatarCropModalStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            '&-cropper': {
                width: 300,
                height: 300,
                overflow: 'hidden'
            },
            'img': {
                width: '100%',
                maxWidth: '100%',
            }
        }
    }
}