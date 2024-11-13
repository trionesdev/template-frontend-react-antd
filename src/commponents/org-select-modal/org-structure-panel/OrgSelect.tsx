import {Avatar, Button, Checkbox, Empty, List, Select, Spin, Tabs} from "antd";
import {FC, useState} from "react";
import _ from "lodash";
import {ApartmentOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {useCssInJs} from "@trionesdev/antd-react-ext";
import {genOrgSelectStyle} from "../styles.ts";
import classNames from "classnames";
import {OrgNode, OrgNodeFieldNames, selectType} from "../types.ts";
import {useRequest} from "ahooks";

enum TabKey {
    ALL = 'ALL',
    MEMBER = 'MEMBER',
    DEPARTMENT = 'DEPARTMENT'
}

type OrgSelectProps = {
    selectType?: selectType,
    selectedNodes?: OrgNode[]
    searchRequest?: (params: any) => Promise<any>
    onTrigger?: (node: OrgNode) => void
    orgNodeFieldNames?: OrgNodeFieldNames
}

const OrgNodeOption: FC<{
    selectType?: selectType,
    multiMode: boolean,
    orgNodeFieldNames?: OrgNodeFieldNames,
    selectedNodes?: OrgNode[],
    onTrigger?: (node: OrgNode) => void
    item: any
}> = ({
          selectType,
          multiMode,
          orgNodeFieldNames,
          selectedNodes,
          onTrigger,
          item
      }) => {
    return <div className={`org-option`} onClick={() => {
        if (selectType) {
            if (selectType === 'member' && _.get(item, orgNodeFieldNames!.type!) === 'MEMBER') {
                onTrigger?.(item)
            } else if (selectType === 'department' && _.get(item, orgNodeFieldNames!.type!) === 'DEPARTMENT') {
                onTrigger?.(item)
            }
        } else {
            onTrigger?.(item)
        }

    }}>
        {multiMode && <Checkbox
            checked={Boolean(_.find(selectedNodes, (node) => _.get(item, orgNodeFieldNames!.id!) === _.get(node, orgNodeFieldNames!.id!)))}/>}
        <Avatar shape={`square`}
                icon={_.get(item, orgNodeFieldNames!.type!) === 'MEMBER' ? <UserOutlined/> : <ApartmentOutlined/>}
                src={_.get(item, 'avatar')}/>
        <div className={`org-option-content`}>
            <div>{_.get(item, 'name')}</div>
            {_.get(item, orgNodeFieldNames!.type!) === 'MEMBER' && <div className={`org-option-meta`}>
                {_.get(item, orgNodeFieldNames!.nickname!) && _.get(item, orgNodeFieldNames!.nickname!) !== _.get(item, orgNodeFieldNames!.name!) &&
                    <div>昵称:{_.get(item, orgNodeFieldNames!.nickname!)}</div>}
            </div>}
        </div>
    </div>
}


export const OrgSelect: FC<OrgSelectProps> = ({
                                                  selectType,
                                                  selectedNodes,
                                                  orgNodeFieldNames,
                                                  searchRequest,
                                                  onTrigger
                                              }) => {
    const [options, setOptions] = useState<any>([])
    const [multiMode, setMultiMode] = useState(false)
    const [open, setOpen] = useState(true)
    const [searchValue, setSearchValue] = useState()
    console.log('searchValue', searchValue)
    let defaultTab = null
    if (!selectType) {
        defaultTab = TabKey.ALL
    } else {
        if (selectType === 'member') {
            defaultTab = TabKey.MEMBER
        } else if (selectType === 'department') {
            defaultTab = TabKey.DEPARTMENT
        }
    }
    const [activeTab, setActiveTab] = useState<string | null>(defaultTab)


    const {run: handleSearch, loading} = useRequest((value: any): Promise<any> => {
        setSearchValue(value)
        if (!value) {
            return Promise.resolve()
        }
        const params = {wd: value}
        if (activeTab != TabKey.ALL) {
            _.assign(params, {type: activeTab})
        }
        return searchRequest?.(params) || Promise.resolve([])
    }, {
        manual: true,
        onSuccess(data: any) {
            setOptions(data || [])
        },
    })

    // const handleSearch = (value: any) => {
    //     setSearchValue(value)
    //     if (!value) {
    //         return
    //     }
    //     const params = {wd: value}
    //     if (activeTab != TabKey.ALL) {
    //         _.assign(params, {type: activeTab})
    //     }
    //     searchRequest?.(params).then(res => {
    //         setOptions(res || [])
    //     })
    // }

    const handleTrigger = (node: any) => {
        onTrigger?.(node)
        if (!multiMode) {
            setOpen(false)
            setOptions([])
        }
    }


    const members = options.filter((option: any) => _.get(option, 'type') === 'MEMBER')
    const departments = options.filter((option: any) => _.get(option, 'type') === 'DEPARTMENT')
    const prefixCls = `org-select`;
    const {wrapSSR, hashId} = useCssInJs({prefix: prefixCls, styleFun: genOrgSelectStyle})

    const handleDropItems = () => {
        let items: any[] = []
        const allTab = {
            key: TabKey.ALL, label: '全部', children: <>
                {_.isEmpty(options) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
                {!_.isEmpty(options) && <Spin spinning={loading}>
                    {!_.isEmpty(members) &&
                        <List header={`成员`} dataSource={members} renderItem={(item: any) =>
                            <List.Item><OrgNodeOption selectType={selectType} multiMode={multiMode}
                                                      selectedNodes={selectedNodes}
                                                      orgNodeFieldNames={orgNodeFieldNames}
                                                      onTrigger={handleTrigger}
                                                      item={item}/></List.Item>}/>}
                    {!_.isEmpty(departments) &&
                        <List header={`部门`} dataSource={departments} renderItem={(item: any) =>
                            <List.Item><OrgNodeOption selectType={selectType} multiMode={multiMode}
                                                      selectedNodes={selectedNodes}
                                                      orgNodeFieldNames={orgNodeFieldNames}
                                                      onTrigger={handleTrigger}
                                                      item={item}/></List.Item>}/>}
                </Spin>}
            </>
        };
        const memberTab = {
            key: TabKey.MEMBER,
            label: '成员',
            children: <>
                <List loading={loading} dataSource={members} renderItem={(item: any) => <List.Item>
                    <OrgNodeOption selectType={selectType} multiMode={multiMode}
                                   selectedNodes={selectedNodes}
                                   orgNodeFieldNames={orgNodeFieldNames}
                                   onTrigger={handleTrigger} item={item}/>
                </List.Item>}/>
            </>
        };
        const departmentTab = {
            key: TabKey.DEPARTMENT,
            label: '部门',
            children: <>
                <List loading={loading} dataSource={departments} renderItem={(item: any) => <List.Item>
                    <OrgNodeOption selectType={selectType} multiMode={multiMode}
                                   selectedNodes={selectedNodes}
                                   orgNodeFieldNames={orgNodeFieldNames}
                                   onTrigger={handleTrigger} item={item}/>
                </List.Item>}/>
            </>
        }
        if (!selectType) {
            items = [allTab, memberTab, departmentTab]
        } else {
            if (selectType === 'member') {
                items = [memberTab]
            } else if (selectType === 'department') {
                items = [departmentTab]
            }
        }
        return items;
    }

    return wrapSSR(
        <Select className={classNames(prefixCls, hashId)} style={{width: '100%'}} suffixIcon={<SearchOutlined/>}
                placeholder={`搜索`}
                value={null}
                options={options}
                open={open && Boolean(searchValue)}
                onSearch={_.debounce(handleSearch, 500)}
                showSearch={true}
                onSelect={(value) => {
                    console.log(value)
                    // setValue(null)
                }}
                onDropdownVisibleChange={(open) => {

                    if (!open) {
                        setOpen(open)
                        setSearchValue(undefined)
                        setOptions([])
                    }
                }}
                dropdownRender={() => {
                    return <div className={classNames(`${prefixCls}-dropdown`, hashId)}>
                        <Tabs size={`small`} defaultActiveKey={activeTab || ''} activeKey={activeTab || ''}
                              onChange={(key) => setActiveTab(key)}
                              tabBarExtraContent={{
                                  right: <>{multiMode ?
                                      <Button size={`small`} type={`link`}
                                              onClick={() => setMultiMode(false)}>单选</Button> :
                                      <Button size={`small`} type={`link`}
                                              onClick={() => setMultiMode(true)}>多选</Button>}</>
                              }} items={handleDropItems()}/>
                    </div>
                }}
        />
    )
}