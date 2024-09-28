import {createHashRouter, RouteObject, RouterProvider} from "@trionesdev/commons-react";
import {SignInPage} from "@app/account/sign-in/page.tsx";
import {RouteConstants} from "./route.constants.ts";
import {MainLayout} from "@app/MainLayout.tsx";
import {FunctionalResourceDraftsPage} from "@app/boss/perm/functional-resource-drafts/page.tsx";
import {FunctionalResourcesPage} from "@app/boss/perm/functional-resources/page.tsx";
import {DepartmentsPage} from "@app/normal/org/departments/page.tsx";
import {NormalLayout} from "@app/normal/layout";
import {OrgStructurePage} from "@app/normal/org/org-structure/page.tsx";
import {TenantMembersPage} from "@app/normal/org/members/page.tsx";
import {RolesPage} from "@app/normal/org/roles/page.tsx";

const routes: RouteObject[] = [
    {...RouteConstants.ACCOUNT.SIGN_IN, element: <SignInPage/>},

    {
        path: () => '/', anonymous: true, element: <MainLayout/>, children: [
            {
                path: () => '/', anonymous: true, element: <NormalLayout/>, children: [
                    {
                        path: () => '/', anonymous: true, element: <div>Home</div>
                    },
                    {...RouteConstants.ORG.DEPARTMENTS, element: <DepartmentsPage/>},
                    {...RouteConstants.ORG.ORG_STRUCTURE, element: <OrgStructurePage/>},
                    {...RouteConstants.ORG.MEMBERS, element: <TenantMembersPage/>},
                    {...RouteConstants.ORG.ROLES, element: <RolesPage/>},


                    {...RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES, element: <FunctionalResourcesPage/>},
                    {...RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCE_DRAFTS, element: <FunctionalResourceDraftsPage/>}
                ]
            },
        ]
    },

]

export const AppRouter = () => {
    return <RouterProvider router={createHashRouter(routes)}/>;
};