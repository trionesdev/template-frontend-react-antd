import {RouteItem} from "@trionesdev/commons-react";

export namespace RouteConstants {
    export const ACCOUNT ={
        SIGN_IN:{
            id:'sign-in',
            path: () => "/sign-in",
            anonymous: true,
        }as RouteItem,
    }
}