import {useContext} from "react";
import {AppConfigContext} from "./context.tsx";

export const useAppConfig = () => {
    return useContext(AppConfigContext)
}