import {Select} from "antd";

export const IconSelect = () => {
  return <Select  dropdownRender={(menu) => {
    debugger
    return <div>{menu}sss</div>
  }} optionRender={(item) => <span>{item.label}</span>}/>
}