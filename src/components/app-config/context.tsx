import {createContext} from "react";

export interface AppConfigContextProps {
    subApp?:boolean
    multiTenant?: boolean;
    selfHost?: boolean;
}

export const AppConfigContext = createContext<AppConfigContextProps>({});