import {Avatar, Button, Checkbox, Empty, List, Select, Space, Tabs} from "antd";
import {FC, useState} from "react";
import _ from "lodash";
import {ApartmentOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {useCssInJs} from "@trionesdev/antd-react-ext";
import {genOrgSelectStyle} from "../styles.ts";
import classNames from "classnames";
import {OrgNode, OrgNodeFieldNames, selectType} from "../types.ts";

type OrgSelectProps = {
    selectType: selectType,
    selectedNodes?: OrgNode[]
    searchRequest?: (params: any) => Promise<any>
    onTrigger?: (node: OrgNode) => void
    orgNodeFieldNames?: OrgNodeFieldNames
}

const OrgNodeOption: FC<{
    selectType: selectType,
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
        onTrigger?.(item)
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


    const handleSearch = (value: any) => {
        if (!value) {
            return
        }
        searchRequest?.({wd: value}).then(res => {
            debugger
            setOptions(res || [])
        })
    }

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
    return wrapSSR(
        <Select className={classNames(prefixCls, hashId)} style={{width: '100%'}} suffixIcon={<SearchOutlined/>}
                placeholder={`搜索`}
                value={null}
                options={options}
                open={open && !_.isEmpty(options)}
                onSearch={_.debounce(handleSearch, 500)}
                showSearch={true}
                onSelect={(value) => {
                    console.log(value)
                    // setValue(null)
                }}
                onDropdownVisibleChange={(open) => {
                    setOpen(open)
                    if (!open) {
                        setOptions([])
                    }
                }}
                dropdownRender={() => {
                    // debugger
                    // return <div>{originNode}</div>
                    return <div className={classNames(`${prefixCls}-dropdown`, hashId)}>
                        <Tabs size={`small`} tabBarExtraContent={{
                            right: <>{multiMode ?
                                <Button size={`small`} type={`link`} onClick={() => setMultiMode(false)}>单选</Button> :
                                <Button size={`small`} type={`link`}
                                        onClick={() => setMultiMode(true)}>多选</Button>}</>
                        }} items={[
                            {
                                key: 'all', label: '全部', children: <>
                                    {_.isEmpty(options) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
                                    {!_.isEmpty(options) && <>
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
                                    </>}
                                </>
                            },
                            {
                                key: 'member',
                                label: '成员',
                                children: <>
                                    <List dataSource={members} renderItem={(item: any) => <List.Item>
                                        <OrgNodeOption selectType={selectType} multiMode={multiMode}
                                                       selectedNodes={selectedNodes}
                                                       orgNodeFieldNames={orgNodeFieldNames}
                                                       onTrigger={handleTrigger} item={item}/>
                                    </List.Item>}/>
                                </>
                            },
                            {
                                key: 'department',
                                label: '部门',
                                children: <>
                                    <List dataSource={departments} renderItem={(item: any) => <List.Item>
                                        <OrgNodeOption selectType={selectType} multiMode={multiMode}
                                                       selectedNodes={selectedNodes}
                                                       orgNodeFieldNames={orgNodeFieldNames}
                                                       onTrigger={handleTrigger} item={item}/>
                                    </List.Item>}/>
                                </>
                            }
                        ]}/>
                    </div>
                }}
        />
    )
}