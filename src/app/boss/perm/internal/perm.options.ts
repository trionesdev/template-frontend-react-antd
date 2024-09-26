import {App, ClientType, ResourceType} from "@app/boss/perm/internal/perm.enums.ts";

export const AppOptions = [
    {label: '租户端', value: App.TENANT, clients: [{label: 'PC_WEB端', value: ClientType.PC_WEB}]},
    {label: '运营端', value: App.BOSS, clients: [{label: 'PC端', value: ClientType.PC_WEB}]},
]

export const ClientTypeOptions = [
    {label: 'PC端', value: ClientType.PC_WEB},
]

export const ResourceTypeOptions = [
    {label: '分类', value: ResourceType.GROUP},
    {label: '菜单', value: ResourceType.MENU},
    {label: '资源', value: ResourceType.RESOURCE},
    {label: '操作', value: ResourceType.ACTION},
]