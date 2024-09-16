import {RouteItem} from "@trionesdev/commons-react";

export namespace RouteConstants {
    export const ACCOUNT ={
        SIGN_IN:{
            id:'sign-in',
            path: () => "/sign-in",
            anonymous: true,
        }as RouteItem,
    }

    export namespace BOSS{
        export const PERM ={
            FUNCTIONAL_RESOURCES:{
                id:'functional-resources',
                path: () => "/boss/perm/functional-resources",
                anonymous: true,
            } as RouteItem,
        }
    }
}