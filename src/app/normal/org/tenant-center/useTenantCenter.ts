import {useContext} from "react";
import {TenantCenterContext} from "@app/normal/org/tenant-center/context.tsx";

export const useTenantCenter = () => {
    return useContext(TenantCenterContext)
}
