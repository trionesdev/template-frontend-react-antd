import {StandAloneLayout} from "@app/layout/StandAloneLayout.tsx";
import {useAppConfig} from "@components/app-config";
import {TrionesLayout} from "@app/layout/TrionesLayout.tsx";


export const AppLayout = () => {
    const appConfig = useAppConfig()
    return <>
        {appConfig.subApp ? <TrionesLayout/> : <StandAloneLayout/>}
    </>
}