import {TenantCenterContext} from "@app/normal/org/tenant-center/context.tsx";
import React, {FC, useState} from "react";

type TenantCenterProviderProps = {
    children?: React.ReactNode
}
export const TenantCenterProvider: FC<TenantCenterProviderProps> = ({children}) => {
    const [tenant, setTenant] = useState<any>()
    return <TenantCenterContext.Provider value={{tenant, setTenant}}>{children}</TenantCenterContext.Provider>
}
