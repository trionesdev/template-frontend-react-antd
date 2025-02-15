import {RouteObject} from '@trionesdev/commons-react';

export type NavRouteObject = RouteObject & {
    pageRoute?: NavRouteObject
    params?: any
}