import {createHashRouter, RouteObject, RouterProvider} from "@trionesdev/commons-react";
import {SignInPage} from "@app/account/sign-in/page.tsx";
import {RouteConstants} from "./route.constants.ts";
import {MainLayout} from "@app/MainLayout.tsx";
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

const routes: RouteObject[] = [
    {...RouteConstants.ACCOUNT.SIGN_IN, element: <SignInPage/>},

    {
        path: () => '/', anonymous: true, element: <MainLayout/>, children: [
            {
                path: () => '/user-center', anonymous: true, element: <UserCenterLayout/>, children: [
                    {...RouteConstants.USER_CENTER.PROFILE, element: <UserProfilePage/>},
                    {...RouteConstants.USER_CENTER.PASSWORD, element: <ChangePasswordPage/>},
                ]
            },
            {
                path: () => '/', anonymous: true, element: <NormalLayout/>, children: [
                    {
                        path: () => '/', anonymous: true, element: <div>Home</div>
                    },


                    {...RouteConstants.ORG.DEPARTMENTS, element: <DepartmentsPage/>},
                    {...RouteConstants.ORG.ORG_STRUCTURE, element: <OrgStructurePage/>},
                    {...RouteConstants.ORG.MEMBERS, element: <TenantMembersPage/>},
                    {...RouteConstants.ORG.ROLES, element: <RolesPage/>},

                    {...RouteConstants.DIC.DICTIONARIES, element: <DictionariesPage/>},
                    {...RouteConstants.DIC.DISTRICTS, element: <DistrictsPage/>},
                    {...RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES, element: <FunctionalResourcesPage/>},
                ]
            },
        ]
    },

]

export const AppRouter = () => {
    return <RouterProvider router={createHashRouter(routes)}/>;
};