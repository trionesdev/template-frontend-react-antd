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
        PROFILE: {
            ...baseConfig,
            id: 'user-profile',
            path: () => "/user-center/profile",
        },
        PASSWORD: {
            ...baseConfig,
            id: 'user-password',
            path: () => "/user-center/password",
        }
    }

    export const ORG = {
        DEPARTMENTS: {
            ...baseConfig,
            id: 'departments',
            path: () => "/org/departments",
        } as RouteObject,
        ORG_STRUCTURE: {
            ...baseConfig,
            id: 'org-structure',
            path: () => "/org/structure",
        },
        MEMBERS: {
            ...baseConfig,
            id: 'org-members',
            path: () => "/org/members",
        },
        ROLES: {
            ...baseConfig,
            id: 'roles',
            path: () => "/org/roles",
        }
    }

    export const DIC = {
        DICTIONARIES: {
            ...baseConfig,
            id: 'dictionaries',
            path: () => "/dic/dictionaries",
        } as RouteObject,
        DISTRICTS: {
            ...baseConfig,
            id: 'districts',
            path: () => "/dic/districts",
        } as RouteObject,
        COUNTRIES: {
            ...baseConfig,
            id: 'countries',
            path: () => "/dic/countries",
        }
    }

    export const LOG = {
        OPERATION_LOGS: {
            ...baseConfig,
            id: 'operation-log',
            path: () => "/log/operation-logs",
        } as RouteObject,
    }

    export namespace BOSS {
        export const PERM = {
            FUNCTIONAL_RESOURCE_DRAFTS: {
                ...baseConfig,
                id: 'functional-resource-drafts',
                path: () => "/boss/perm/functional-resource-drafts",
            } as RouteObject,
            FUNCTIONAL_RESOURCES: {
                ...baseConfig,
                id: 'functional-resources',
                path: () => "/boss/perm/functional-resources",
            } as RouteObject,
        }
    }
}