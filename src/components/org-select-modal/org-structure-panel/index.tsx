import {FC, useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {Avatar, Breadcrumb, Button, Checkbox, List} from "antd";
import {ApartmentOutlined, UserOutlined} from "@ant-design/icons";
import {useCssInJs} from "@trionesdev/antd-react-ext";
import {genOrgStructPanelStyle} from "../styles";
import classNames from "classnames";
import _ from "lodash";
import {OrgLevel, OrgLevelFieldNames, OrgNode, OrgNodeFieldNames, selectType} from "../types.ts";
import {OrgSelect} from "./OrgSelect.tsx";

type OrgStructurePanelProps = {
    open?: boolean,
    value?: OrgNode[],
    onChange?: (nodes: any[]) => void
    selectType?: selectType
    orgLevelsRequest?: (id: any) => Promise<OrgLevel[]>
    orgNodesRequest?: (departmentId: any) => Promise<OrgNode[]>
    orgLevelFieldNames?: OrgLevelFieldNames
    orgNodeFieldNames?: OrgNodeFieldNames
    searchRequest?: (params: any) => Promise<any>
}
export const OrgStructurePanel: FC<OrgStructurePanelProps> = ({
                                                                  open,
                                                                  value,
                                                                  onChange,
                                                                  selectType,
                                                                  orgLevelsRequest,
                                                                  orgNodesRequest,
                                                                  orgLevelFieldNames,
                                                                  orgNodeFieldNames,
                                                                  searchRequest
                                                              }) => {
    const innerOrgLevelFieldNames = _.assign({
        id: 'id',
        name: 'name',
    }, orgLevelFieldNames)
    const innerOrgNodeFieldNames = _.assign({
        id: 'id',
        name: 'name',
        parentId: 'parentId',
        type: 'type',
        avatar: 'avatar',
        nickname: 'nickname'
    }, orgNodeFieldNames)
    const [departmentId, setDepartmentId] = useState<string>("0");
    const [departmentPaths, setDepartmentPaths] = useState<OrgLevel[]>([]);
    const [rows, setRows] = useState<any[]>([])
    const [selectedNodes, setSelectedNodes] = useState<OrgNode[]>(value || []);

    const {run: handleQueryOrgLevels} = useRequest(() => {
        return orgLevelsRequest?.(departmentId) || Promise.resolve([])
    }, {
        manual: true,
        onSuccess(data: any) {
            setDepartmentPaths(data || [])
        },
        onError(e) {
            console.error(e)
        }
    })

    const {run: queryDepartmentOrgNodeList, loading} = useRequest(() => {
        return orgNodesRequest?.(departmentId) || Promise.resolve([])
    }, {
        manual: true,
        onSuccess(data: any) {
            setRows(data || [])
        },

        onError(e) {
            console.error(e)
        }
    })

    const handleTrigger = (node: any) => {
        if (_.find(selectedNodes, (item) => item.id === node.id)) {
            setSelectedNodes(_.filter(selectedNodes, (item) => item.id !== node.id))
        } else {
            setSelectedNodes([...selectedNodes, node])
        }
    }

    useEffect(() => {
        onChange?.(selectedNodes)
    }, [selectedNodes]);


    useEffect(() => {
        if (!_.isEqual(value || [], selectedNodes || [])) {
            setSelectedNodes(value || [])
        }
    }, [value]);

    useEffect(() => {
        if (open) {
            handleQueryOrgLevels()
            queryDepartmentOrgNodeList()
        }
    }, [open, departmentId]);

    const prefixCls = `org-nodes`;
    const {wrapSSR, hashId} = useCssInJs({prefix: prefixCls, styleFun: genOrgStructPanelStyle})
    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>
            <OrgSelect selectType={selectType} searchRequest={searchRequest} selectedNodes={selectedNodes}
                       orgNodeFieldNames={innerOrgNodeFieldNames}
                       onTrigger={handleTrigger}/>
            <div style={{padding: '4px 0px'}}>
                <Breadcrumb className={`${prefixCls}-breadcrumb`}
                            separator=">"
                            items={departmentPaths.map((department: any) => {
                                return {
                                    title: _.get(department, innerOrgLevelFieldNames.name),
                                    onClick: () => setDepartmentId(_.get(department, innerOrgLevelFieldNames.id))
                                }
                            })}
                />
            </div>
            <List className={classNames(`${prefixCls}-list`, hashId)}  size={`small`} loading={loading} rowKey={`id`}
                  bordered={false} split={false}
                  dataSource={rows} renderItem={(item: any) => {
                return <List.Item className={classNames(`${prefixCls}-item`, hashId)}>
                    <div className={classNames(`${prefixCls}-item-inner`, hashId)} onClick={() => {
                        if (selectType) {
                            if (selectType == 'department' && _.get(item, innerOrgNodeFieldNames.type) === 'DEPARTMENT') {
                                return handleTrigger(item)
                            } else if (selectType == 'member' && _.get(item, innerOrgNodeFieldNames.type) === 'MEMBER') {
                                return handleTrigger(item)
                            }
                        } else {
                            return handleTrigger(item)
                        }
                    }}>
                        {(() => {
                            if (selectType) {
                                if ((selectType === 'department' && item.type === 'DEPARTMENT') || (selectType === 'member' && item.type === 'MEMBER')) {
                                    return <Checkbox
                                        checked={Boolean(_.find(selectedNodes, (node) => item.id === node.id))}/>
                                }
                            } else {
                                return <Checkbox
                                    checked={Boolean(_.find(selectedNodes, (node) => item.id === node.id))}/>
                            }
                        })()}
                        <div className={classNames(`${prefixCls}-item-content`, hashId)}>
                            {item.type === 'MEMBER' ? <>
                                <div className={classNames(`${prefixCls}-item-content-title`, hashId)}>
                                    <Avatar shape={`square`} icon={<UserOutlined/>}
                                            src={_.get(item, innerOrgNodeFieldNames.avatar)}/>
                                    <span style={{cursor: 'default'}}>{_.get(item, innerOrgNodeFieldNames.name)}</span>
                                </div>
                            </> : <>
                                <div className={classNames(`${prefixCls}-item-content-title`, hashId)}>
                                    <Avatar shape={`square`} icon={<ApartmentOutlined/>}/>
                                    <span style={{cursor: 'default'}}>{_.get(item, innerOrgNodeFieldNames.name)}</span>
                                </div>
                                <div>
                                    <Button size={`small`} type={`link`}
                                            disabled={Boolean(_.find(selectedNodes, (node) => _.get(node, innerOrgNodeFieldNames.id) === _.get(item, innerOrgNodeFieldNames.id)))}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setDepartmentId(_.get(item, innerOrgNodeFieldNames.id));
                                            }}>下级</Button>
                                </div>
                            </>}
                        </div>
                    </div>
                </List.Item>
            }}/>
        </div>
    )
}