import {RouteItem} from "@trionesdev/commons-react";

export namespace RouteConstants {
    export const ACCOUNT = {
        SIGN_IN: {
            id: 'sign-in',
            path: () => "/sign-in",
            anonymous: true,
        } as RouteItem,
    }

    export const ORG = {
        DEPARTMENTS: {
            id: 'departments',
            path: () => "/org/departments",
            anonymous: true,
        } as RouteItem,
        ORG_STRUCTURE:{
            id:'org-structure',
            anonymous: true,
            path: () => "/org/structure",
        },
        MEMBERS:{
            id:'org-members',
            anonymous: true,
            path: () => "/org/members",
        }
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