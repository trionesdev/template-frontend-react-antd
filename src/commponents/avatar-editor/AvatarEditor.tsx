import {Image, Modal, Upload} from "antd";
import {useCssInJs} from "@trionesdev/antd-react-ext";
import classNames from "classnames";
import {CSSProperties, FC, useState} from "react";
import {CameraOutlined} from "@ant-design/icons";
import {genAvatarEditorStyle} from "./styles.ts";
import {AvatarCropModal} from "./AvatarCropModal.tsx";

type AvatarEditorProps = {
    value?: string;
    onChange?: (value: string) => void;
    style?: CSSProperties;
    className?: string;
    width?: number;
    height?: number;
    accept?: string;
    editable?: boolean;
    uploadRequest?: (file: File) => Promise<string>;
}

export const AvatarEditor: FC<AvatarEditorProps> = ({
                                                        value,
                                                        onChange,
                                                        style,
                                                        className,
                                                        width = 200,
                                                        height = 200,
                                                        editable=true,
                                                        accept = '.jpg,.jpeg,.png,.webp',
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

    const handleImageSelect = async (param: any) => {
        if (!param.file) {
            return;
        }
        getBase64(param.file, (url) => {
            setCropImage(url)
            setOpen(true)
        });
    };

    const handleUpload = (dataURL: any) => {
        if (uploadRequest) {

        } else {
            setInnerValue(dataURL)
            setOpen(false)
        }
    }


    const prefixCls = 'triones-avatar-editor';
    const {hashId, wrapSSR} = useCssInJs({
        prefix: prefixCls,
        styleFun: genAvatarEditorStyle,
    });
    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>
            <div style={{width: width, height: height}}>
                {innerValue ? <div className={classNames(`${prefixCls}-avatar`, hashId)}>
                    <Image width={width} height={height} preview={false} src={innerValue}/>
                    {editable && <div className={classNames(`${prefixCls}-avatar-mask`, hashId)}>
                        <label>
                            <input type={'file'} style={{display: "none"}} onChange={(event)=>{
                                debugger
                            }}/>
                            <CameraOutlined/>
                        </label>
                    </div>}
                </div> : <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    accept={accept}
                    showUploadList={false}
                    customRequest={handleImageSelect}
                >
                    <CameraOutlined/>
                </Upload>}
            </div>
            <AvatarCropModal open={open} cropImage={cropImage} onCancel={() => {
                setOpen(false)
                setCropImage(undefined)
            }} onOk={handleUpload}/>
        </div>
    )
}