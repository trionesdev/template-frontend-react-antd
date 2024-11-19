import {createHashRouter, RouteObject, RouterProvider} from "@trionesdev/commons-react";
import {SignInPage} from "@app/account/sign-in/page.tsx";
import {RouteConstants} from "./route.constants.ts";
import {FunctionalResourcesPage} from "@app/boss/perm/functional-resources/page.tsx";
import {DepartmentsPage} from "@app/normal/org/departments/page.tsx";
import {NormalLayout} from "@app/normal/layout";
import {OrgStructurePage} from "@app/normal/org/org-structure/page.tsx";
import {TenantMembersPage} from "@app/normal/org/members/page.tsx";
import {RolesPage} from "@app/normal/org/roles/page.tsx";
import {DistrictsPage} from "@app/boss/dic/districts/page.tsx";
import {DictionariesPage} from "@app/boss/dic/dictionaries/page.tsx";
import {UserCenterLayout} from "@app/user-center/UserCenterLayout.tsx";
import {UserProfilePage} from "@app/user-center/profile/page.tsx";
import {ChangePasswordPage} from "@app/user-center/change-password/page.tsx";
import {CountriesPage} from "@app/boss/dic/countries/page.tsx";
import {OperationLogsPage} from "@app/normal/log/operation/page.tsx";
import {AppLayout} from "@app/layout";
import {CodeFormatRulesPage} from "@app/normal/base/code-format-rules/page.tsx";
import {WarehousesPage} from "@app/normal/warehouse/warehouses/page.tsx";
import {WarehouseAreasPage} from "@app/normal/warehouse/warehouse-areas/page.tsx";
import {WarehouseLocationsPage} from "@app/normal/warehouse/warehouse-locations/page.tsx";
import {WarehouseContainersPage} from "@app/normal/warehouse/warehouse-containers/page.tsx";

const routes: RouteObject[] = [
    {...RouteConstants.ACCOUNT.SIGN_IN, element: <SignInPage/>},

    {
        path: () => '/', anonymous: false, element: <AppLayout/>, children: [
            {
                path: () => '/user-center', anonymous: false, element: <UserCenterLayout/>, children: [
                    {...RouteConstants.USER_CENTER.PROFILE, element: <UserProfilePage/>},
                    {...RouteConstants.USER_CENTER.PASSWORD, element: <ChangePasswordPage/>},
                ]
            },
            {
                path: () => '/', anonymous: false, element: <NormalLayout/>, children: [
                    {
                        id: 'home', path: () => '/', anonymous: false, element: <div>Home</div>
                    },


                    {...RouteConstants.ORG.DEPARTMENTS, element: <DepartmentsPage/>},
                    {...RouteConstants.ORG.ORG_STRUCTURE, element: <OrgStructurePage/>},
                    {...RouteConstants.ORG.MEMBERS, element: <TenantMembersPage/>},
                    {...RouteConstants.ORG.ROLES, element: <RolesPage/>},

                    {...RouteConstants.DIC.DICTIONARIES, element: <DictionariesPage/>},
                    {...RouteConstants.DIC.DISTRICTS, element: <DistrictsPage/>},
                    {...RouteConstants.DIC.COUNTRIES, element: <CountriesPage/>},

                    {...RouteConstants.WAREHOUSE.WAREHOUSES, element: <WarehousesPage/>},
                    {...RouteConstants.WAREHOUSE.WAREHOUSE_AREAS, element: <WarehouseAreasPage/>},
                    {...RouteConstants.WAREHOUSE.WAREHOUSE_LOCATIONS, element: <WarehouseLocationsPage/>},
                    {...RouteConstants.WAREHOUSE.WAREHOUSE_CONTAINERS, element: <WarehouseContainersPage/>},

                    {...RouteConstants.LOG.OPERATION_LOGS, element: <OperationLogsPage/>},
                    {...RouteConstants.BASE.CODE_FORMAT_RULES, element: <CodeFormatRulesPage/>},

                    {...RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES, element: <FunctionalResourcesPage/>},
                ]
            },
        ]
    },

]

export const routeMatch = (id: string): RouteObject | undefined => {
    const match = (id: string, routes: RouteObject[]): RouteObject | undefined => {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].id === id) {
                return routes[i]
            }
            const children = routes[i].children
            if (children) {
                const result = match(id, children)
                if (result) {
                    return result
                }
            }
        }
    }
    return match(id, routes)
}

export const AppRouter = () => {
    return <RouterProvider router={createHashRouter(routes)}/>;
};