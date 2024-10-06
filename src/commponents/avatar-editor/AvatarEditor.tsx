import {Avatar, Spin} from "antd";
import {useCssInJs} from "@trionesdev/antd-react-ext";
import classNames from "classnames";
import {CSSProperties, FC, useEffect, useState} from "react";
import {CameraOutlined, UserOutlined} from "@ant-design/icons";
import {genAvatarEditorStyle} from "./styles.ts";
import {AvatarCropModal} from "./AvatarCropModal.tsx";
import _ from "lodash";

type AvatarEditorProps = {
    value?: string;
    onChange?: (value: string) => void;
    style?: CSSProperties;
    className?: string;
    size?: number;
    accept?: string;
    editable?: boolean;
    uploadRequest?: (file: File) => Promise<string>;
}

export const AvatarEditor: FC<AvatarEditorProps> = ({
                                                        value,
                                                        onChange,
                                                        style,
                                                        className,
                                                        size = 200,
                                                        editable = true,
                                                        accept = '.jpg,.jpeg,.png,.svg,.webp',
                                                        uploadRequest,
                                                    }) => {
    const [innerValue, setInnerValue] = useState<any>(value)
    const [open, setOpen] = useState<boolean>(false)
    const [cropImage, setCropImage] = useState<any>()
    const [loading, setLoading] = useState(false);

    const getBase64 = (img: any, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const handleImageSelect = async (e: any) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) {
            return;
        }
        getBase64(file, (url) => {
            setCropImage(url)
            setOpen(true)
        });
    };

    const handleUpload = (dataURL: any) => {
        if (uploadRequest) {
            const binaryData = atob(dataURL.split(',')[1]);
            const array = new Uint8Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
                array[i] = binaryData.charCodeAt(i);
            }
            const blob = new Blob([array], {type: 'application/octet-stream'});
            const typeInfo = dataURL.split(';')[0];
            const mimeType = typeInfo.split(':')[1];
            const fileExt = mimeType.split('/')[1];
            const file = new File([blob], `file.${fileExt}`, {type: mimeType});
            setLoading(true)
            uploadRequest(file).then((url: string) => {
                setInnerValue(url)
                onChange?.(url)
            }).finally(() => {
                setLoading(false)
                setOpen(false)
            })
        } else {
            setInnerValue(dataURL)
            setOpen(false)
            onChange?.(dataURL)
        }
    }

    useEffect(() => {
        if (_.eq(value || '', innerValue || '')) {
            setInnerValue(value || '')
        }
    }, [value])

    const prefixCls = 'triones-avatar-editor';
    const {hashId, wrapSSR} = useCssInJs({
        prefix: prefixCls,
        styleFun: genAvatarEditorStyle,
    });
    return wrapSSR(
        <div className={classNames(prefixCls, className, hashId)} style={style}>
            <Spin spinning={loading}>
                <div style={{width: size, height: size}}>
                    <div className={classNames(`${prefixCls}-avatar`, hashId)}>
                        <Avatar size={size} shape={'square'} icon={<UserOutlined/>} src={innerValue}/>
                        {editable && <div className={classNames(`${prefixCls}-avatar-mask`, hashId)}>
                            <label>
                                <input type={'file'} style={{display: "none"}} accept={accept}
                                       onChange={handleImageSelect}/>
                                <CameraOutlined/>
                            </label>
                        </div>}
                    </div>
                </div>
            </Spin>
            <AvatarCropModal open={open} cropImage={cropImage} onCancel={() => {
                setOpen(false)
                setCropImage(undefined)
            }} onOk={handleUpload}/>
        </div>
    )
}