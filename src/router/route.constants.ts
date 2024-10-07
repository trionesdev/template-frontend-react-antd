import {RouteItem, RouteObject} from "@trionesdev/commons-react";

export namespace RouteConstants {
    export const ACCOUNT = {
        SIGN_IN: {
            id: 'sign-in',
            path: () => "/sign-in",
            anonymous: true,
        } as RouteItem,
    }

    export const USER_CENTER = {
        PROFILE: {
            id: 'user-profile',
            anonymous: true,
            path: () => "/user-center/profile",
        },
        PASSWORD: {
            id: 'user-password',
            anonymous: true,
            path: () => "/user-center/password",
        }
    }

    export const ORG = {
        DEPARTMENTS: {
            id: 'departments',
            path: () => "/org/departments",
            anonymous: true,
        } as RouteObject,
        ORG_STRUCTURE: {
            id: 'org-structure',
            anonymous: true,
            path: () => "/org/structure",
        },
        MEMBERS: {
            id: 'org-members',
            anonymous: true,
            path: () => "/org/members",
        },
        ROLES: {
            id: 'roles',
            anonymous: true,
            path: () => "/org/roles",
        }
    }

    export const DIC = {
        DICTIONARIES: {
            id: 'dictionaries',
            path: () => "/dic/dictionaries",
            anonymous: true,
        } as RouteObject,
        DISTRICTS: {
            id: 'districts',
            path: () => "/dic/districts",
            anonymous: true,
        } as RouteObject,
    }

    export namespace BOSS {
        export const PERM = {
            FUNCTIONAL_RESOURCE_DRAFTS: {
                id: 'functional-resource-drafts',
                path: () => "/boss/perm/functional-resource-drafts",
                anonymous: true,
            } as RouteItem,
            FUNCTIONAL_RESOURCES: {
                id: 'functional-resources',
                path: () => "/boss/perm/functional-resources",
                anonymous: true,
            } as RouteItem,
        }
    }
}