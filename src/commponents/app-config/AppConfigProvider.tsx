import React, {FC, useEffect, useState} from "react";
import {AppConfigContext} from "./context.tsx";

type AppConfigProviderProps = {
    children?: React.ReactNode,
    configRequest?: () => Promise<any>
    subApp?: boolean
    defaultConfig?: {
        multiTenant?: boolean,
        selfHost?: boolean
    }
}

export const AppConfigProvider: FC<AppConfigProviderProps> = ({
                                                                  children, configRequest, subApp, defaultConfig
                                                              }) => {
    const [config, setConfig] = useState<{ multiTenant?: boolean, selfHost?: boolean }>(defaultConfig || {})

    useEffect(() => {
        configRequest?.()?.then(data => setConfig(data || {})).catch(ex => console.error(ex))
    }, []);

    return <AppConfigContext.Provider value={{
        subApp,
        multiTenant: config.multiTenant,
        selfHost: config.selfHost
    }}>{children}</AppConfigContext.Provider>
}