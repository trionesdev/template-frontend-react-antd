import {App, ClientType} from "@app/boss/perm/internal/perm.enums.ts";

export const AppOptions = [
    {label: '租户端', value: App.TENANT, clients: [{label: 'PC_WEB端', value: ClientType.PC_WEB}]},
    {label: '运营端', value: App.BOSS, clients: [{label: 'PC端', value: ClientType.PC_WEB}]},
]

export const ClientTypeOptions = [
    {label: 'PC端', value: ClientType.PC_WEB},
]