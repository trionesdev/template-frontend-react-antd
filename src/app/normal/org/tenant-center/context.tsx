import {createContext} from "react";

interface TenantCenterContextType {
    tenant?: any
    setTenant?: (tenant: any) => void
}

export const TenantCenterContext = createContext<TenantCenterContextType>({})
