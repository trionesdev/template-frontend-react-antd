import React, {FC, type SyntheticEvent, useEffect, useState} from "react";
import {Button, Flex, Modal, Space} from "antd";
import {OrgNodeTag} from "./OrgNodeTag";
import {OrgStructurePanel} from "./org-structure-panel";
import _ from "lodash";
import {OrgLevelFieldNames, OrgNodeFieldNames, selectType} from "./types.ts";

type OrgSelectModalProps = {
    children?: React.ReactElement
    value?: any[]
    onOk?: (value: any[]) => void
    /**
     * @description 标题
     * @default
     */
    title?: string
    /**
     * @description 宽度
     * @default
     */
    width?: number
    /**
     * @description 关闭之后是否情况选择
     * @default
     */
    cleanAfterClose?: boolean
    /**
     * @description 选择模式
     * @default
     */
    selectType?: selectType
    orgLevelsRequest?: (id: any) => Promise<any>
    orgNodesRequest?: (departmentId: any) => Promise<any>
    orgLevelFieldNames?: OrgLevelFieldNames
    orgNodeFieldNames?: OrgNodeFieldNames
    /**
     * @description 查询请求
     * @default
     */
    searchRequest?: (params: any) => Promise<any>
}
export const OrgSelectModal: FC<OrgSelectModalProps> = ({
                                                            children,
                                                            value,
                                                            onOk,
                                                            title = '选择组织成员',
                                                            width = 600,
                                                            cleanAfterClose,
                                                            selectType,
                                                            orgLevelsRequest,
                                                            orgNodesRequest,
                                                            orgLevelFieldNames,
                                                            orgNodeFieldNames,
                                                            searchRequest
                                                        }) => {
    const [open, setOpen] = useState(false)
    const [selectedNodes, setSelectedNodes] = useState<any[]>(value || []);

    useEffect(() => {
        if (!_.isEqual(value || [], selectedNodes || [])) {
            setSelectedNodes(value || [])
        }
    }, [value]);

    return <>
        {children && React.cloneElement(children, {
            ...children.props, onClick: (e?: SyntheticEvent) => {
                children.props.onClick?.(e);
                setOpen(true);
            }
        })}
        <Modal open={open} title={title}
               styles={{body: {marginBottom: -20, marginLeft: -20, marginRight: -20}}}
               width={width}
               footer={false}
               onCancel={() => {
                   setOpen(false)
               }}
               afterOpenChange={(o) => {
                   setOpen(o)
                   if (!o) {
                       setSelectedNodes([])
                   }
               }}
               destroyOnClose={true}
        >
            <Flex justify="space-between" style={{minHeight: 400}} gap={4}>
                <div style={{width: '100%'}}>
                    <OrgStructurePanel open={open} value={selectedNodes}
                                       onChange={setSelectedNodes}
                                       selectType={selectType}
                                       orgLevelsRequest={orgLevelsRequest}
                                       orgNodesRequest={orgNodesRequest}
                                       orgLevelFieldNames={orgLevelFieldNames}
                                       orgNodeFieldNames={orgNodeFieldNames}
                                       searchRequest={searchRequest}
                    />
                </div>
                <div style={{borderLeft: '1px solid #e8e8e8'}}/>
                <Flex vertical={true} gap={4} style={{width: '100%'}}>
                    <div style={{flex: 1, overflowY: 'auto'}}>
                        <Flex gap="4px 0" wrap>
                            {selectedNodes.map((node) => <OrgNodeTag key={node.id} orgNode={node} onClose={(id) => {
                                setSelectedNodes((nodes) => nodes.filter((node) => node.id !== id))
                            }}/>)}
                        </Flex>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <Space>
                            <Button onClick={() => setOpen(false)}>取消</Button>
                            <Button type={`primary`} onClick={() => {
                                setOpen(false)
                                onOk?.(selectedNodes);
                                if (cleanAfterClose) {
                                    setSelectedNodes([]);
                                }
                            }}>确定</Button>
                        </Space>
                    </div>
                </Flex>
            </Flex>
        </Modal>
    </>
}