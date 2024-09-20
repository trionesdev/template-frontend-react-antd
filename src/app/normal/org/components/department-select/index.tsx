
import {FC} from "react";
import {FetchTreeSelect, FetchTreeSelectProps} from "../../../../../commponents/fetch-tree-select";
import {departmentApi} from "@apis/backend";


export type DepartmentSelectProps = Omit<FetchTreeSelectProps, 'fetchRequest'>

export const DepartmentSelect: FC<DepartmentSelectProps> = ({...props}) => {
    return <FetchTreeSelect {...props} dropdownFetch={false} fetchRequest={() => {
        return departmentApi.queryDepartmentsTree({mode:'TENANT_ROOT'})
    }} fieldNames={{value: 'id', label: 'name'}} treeDefaultExpandedKeys={["0"]}/>;
}