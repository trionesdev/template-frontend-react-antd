import {FC} from "react";

import {departmentApi} from "@apis/backend";
import {FetchTreeSelectProps} from "@trionesdev/antd-react-ext/dist/fetch-tree-select/fetch-tree-select";
import {FetchTreeSelect} from "@trionesdev/antd-react-ext";


export type DepartmentSelectProps = Omit<FetchTreeSelectProps, 'fetchRequest'>

export const DepartmentSelect: FC<DepartmentSelectProps> = ({...props}) => {
    return <FetchTreeSelect {...props} dropdownFetch={false} fetchRequest={() => {
        return departmentApi.queryDepartmentsTree({mode: 'TENANT_ROOT'})
    }} fieldNames={{value: 'id', label: 'name'}} treeDefaultExpandedKeys={["0"]}/>;
}