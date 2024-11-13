import {StandAloneLayout} from "@app/normal/layout/StandAloneLayout.tsx";
import {useAppConfig} from "../../../commponents/app-config";
import {TrionesLayout} from "@app/normal/layout/TrionesLayout.tsx";

export const NormalLayout = () => {
    const appConfig = useAppConfig()
    return <>
        {appConfig.subApp ? <TrionesLayout/> : <StandAloneLayout/>}
    </>
}