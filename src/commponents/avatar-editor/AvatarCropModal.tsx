import {Modal, Space} from "antd";
import {FC, useEffect, useRef, useState} from "react";
import Cropper from "cropperjs";
import {useCssInJs} from "@trionesdev/antd-react-ext";
import {genAvatarCropModalStyle} from "./styles.ts";
import classNames from "classnames";
import "cropperjs/dist/cropper.css"

type AvatarCropModalProps = {
    open?: boolean
    cropImage?: string
    onCancel?: () => void
    onOk?: (dataUrl: string) => void
}
export const AvatarCropModal: FC<AvatarCropModalProps> = ({open, cropImage, onCancel}) => {
    const cropElRef = useRef<HTMLImageElement>(null)
    const [cropper, setCropper] = useState<any>()

    const handleInit = () => {
        const cropperInstance = new Cropper(cropElRef.current!, {
            viewMode: 1,
            aspectRatio: 1 / 1,
            dragMode: "move",
            movable: true,
            modal: true,
            guides: true,
            center: true,
            background: true,
            autoCrop: true,
            cropBoxMovable: false,
            cropBoxResizable: false,

            autoCropArea: 1,
            zoomOnWheel: true,
            ready: function () {

            }
        })
        setCropper(cropperInstance)
    }

    useEffect(() => {
        if (open && cropElRef.current) {
            handleInit()
        }
        return () => {
            console.log("destroy")
            cropper?.destroy()
        }
    }, [open, cropElRef.current, cropImage])

    const prefixCls = 'triones-avatar-crop-modal';
    const {hashId, wrapSSR} = useCssInJs({
        prefix: prefixCls,
        styleFun: genAvatarCropModalStyle,
    });

    return wrapSSR(
        <Modal open={open} className={classNames(prefixCls, hashId)} onCancel={onCancel}

               footer={(originNode, extra) => {
                   return <div style={{textAlign: 'center'}}>
                       <Space>{originNode}</Space>
                   </div>
               }}>
            <Space>
                <div className={classNames(`${prefixCls}-cropper`, hashId)} style={{width: 300, height: 300}}>
                    <img style={{width: 300}} ref={cropElRef} src={cropImage}/>
                </div>
            </Space>

        </Modal>
    )
}