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

    export const CUSTOMER = {
        CUSTOMERS: {
            ...baseConfig,
            id: 'customers',
            label: '客户管理',
            path: () => "/customer/customers",
        } as RouteObject,
    }

    export const SUPPLIER = {
        SUPPLIERS: {
            ...baseConfig,
            id: 'suppliers',
            label: '供应商管理',
            path: () => "/supplier/suppliers",
        } as RouteObject,
    }

    export const GOOD = {
        GOODS: {
            ...baseConfig,
            id: 'goods',
            label: '货物管理',
            path: () => "/good/goods",
        } as RouteObject,
        MEASURE_UNITS: {
            ...baseConfig,
            id: 'measure-units',
            label: '单位管理',
            path: () => "/good/measure-units",
        } as RouteObject,
    }

    export const LOG = {
        OPERATION_LOGS: {
            ...baseConfig,
            id: 'operation-log',
            label: '操作日志',
            path: () => "/log/operation-logs",
        } as RouteObject,
    }

    export const WAREHOUSE = {
        WAREHOUSES: {
            ...baseConfig,
            id: 'warehouses',
            label: '仓库管理',
            path: () => "/warehouse/warehouses",
        } as RouteObject,
        WAREHOUSE_AREAS: {
            ...baseConfig,
            id: 'warehouse-areas',
            label: '库区管理',
            path: () => "/warehouse/warehouse-areas",
        } as RouteObject,
        WAREHOUSE_LOCATIONS: {
            ...baseConfig,
            id: 'warehouse-locations',
            label: '库位管理',
            path: () => "/warehouse/warehouse-locations",
        } as RouteObject,
        WAREHOUSE_CONTAINERS: {
            ...baseConfig,
            id: 'warehouse-containers',
            label: '托盘管理',
            path: () => "/warehouse/warehouse-containers",
        } as RouteObject,
        WAREHOUSE_INBOUND_PLAN: {
            ...baseConfig,
            id: 'warehouse-inbound-plans',
            label: '入库计划',
            path: () => "/warehouse/warehouse-inbound-plans",
        } as RouteObject,
        WAREHOUSE_INBOUND_PLAN_NEW: {
            ...baseConfig,
            id: 'warehouse-inbound-plan-new',
            label: '添加出库计划',
            path: () => "/warehouse/warehouse-inbound-plans/new",
        } as RouteObject,
        WAREHOUSE_INBOUND_PLAN_EDIT: {
            ...baseConfig,
            id: 'warehouse-inbound-plan-edit',
            label: '修改出库计划',
            path: (id?:any) => `/warehouse/warehouse-inbound-plans/edit/${id || ":id"}`,
        } as RouteObject,
        WAREHOUSE_INBOUND_ORDER: {
            ...baseConfig,
            id: 'inbound-orders',
            label: '入库单',
            path: () => "/warehouse/inbound-orders",
        } as RouteObject,
        WAREHOUSE_OUTBOUND_PLAN: {
            ...baseConfig,
            id: 'warehouse-outbound-plans',
            label: '出库计划',
            path: () => "/warehouse/warehouse-outbound-plans",
        } as RouteObject,
        WAREHOUSE_OUTBOUND_ORDER: {
            ...baseConfig,
            id: 'warehouse-outbound-orders',
            label: '出库单',
            path: () => "/warehouse/warehouse-outbound-orders",
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