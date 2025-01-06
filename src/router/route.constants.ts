import {RouteObject} from "@trionesdev/commons-react";

export namespace RouteConstants {
    const baseConfig = {
        anonymous: false,
    } as RouteObject;

    export const ACCOUNT = {
        SIGN_IN: {
            id: 'sign-in',
            path: () => "/sign-in",
            anonymous: true,
        } as RouteObject,
    }

    export const USER_CENTER = {
        LAYOUT:{
            ...baseConfig,
            id: 'user-center',
            label: '个人中心',
            path: () => "/user-center",
        },
        PROFILE: {
            ...baseConfig,
            id: 'user-profile',
            label: '个人信息',
            path: () => "/user-center/profile",
        },
        PASSWORD: {
            ...baseConfig,
            id: 'user-password',
            label: '修改密码',
            path: () => "/user-center/password",
        }
    }

    export const ORG = {
        DEPARTMENTS: {
            ...baseConfig,
            id: 'departments',
            label: '部门管理',
            path: () => "/org/departments",
        } as RouteObject,
        ORG_STRUCTURE: {
            ...baseConfig,
            id: 'org-structure',
            label: '组织架构',
            path: () => "/org/structure",
        },
        MEMBERS: {
            ...baseConfig,
            id: 'org-members',
            label: '成员管理',
            path: () => "/org/members",
        },
        ROLES: {
            ...baseConfig,
            id: 'roles',
            label: '角色管理',
            path: () => "/org/roles",
        }
    }

    export const DIC = {
        DICTIONARIES: {
            ...baseConfig,
            id: 'dictionaries',
            label: '字典管理',
            path: () => "/dic/dictionaries",
        } as RouteObject,
        DISTRICTS: {
            ...baseConfig,
            id: 'districts',
            label: '地区管理',
            path: () => "/dic/districts",
        } as RouteObject,
        COUNTRIES: {
            ...baseConfig,
            id: 'countries',
            label: '国家管理',
            path: () => "/dic/countries",
        }
    }


    export const LOG = {
        OPERATION_LOGS: {
            ...baseConfig,
            id: 'operation-log',
            label: '操作日志',
            path: () => "/log/operation-logs",
        } as RouteObject,
    }


    export const BASE = {
        CODE_FORMAT_RULES:{
            ...baseConfig,
            id: 'code-format-rules',
            label: '编码规则',
            path: () => "/base/code-format-rules",
        }
    }

    export namespace BOSS {
        export const PERM = {
            FUNCTIONAL_RESOURCES: {
                ...baseConfig,
                id: 'functional-resources',
                label: '功能资源',
                path: () => "/boss/perm/functional-resources",
            } as RouteObject,
        }
    }
}