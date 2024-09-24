import {createContext} from "react";

export interface AppConfigContextProps {
    multiTenant?: boolean;
    selfHost?: boolean;
}

export const AppConfigContext = createContext<AppConfigContextProps>({});