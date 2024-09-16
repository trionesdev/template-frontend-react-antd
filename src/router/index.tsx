import {createHashRouter, RouteObject, RouterProvider} from "@trionesdev/commons-react";
import {SignInPage} from "@app/account/sign-in/page.tsx";
import {RouteConstants} from "./route.constants.ts";
import {MainLayout} from "@app/MainLayout.tsx";
import {FunctionalResourcesPage} from "@app/boss/perm/functional-resources/page.tsx";

const routes: RouteObject[] = [
    {...RouteConstants.ACCOUNT.SIGN_IN, element: <SignInPage/>},
    {
        path: () => '/boss/', anonymous: true, element: <MainLayout/>, children: [
            {...RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES, element: <FunctionalResourcesPage/>}
        ]
    },
    {
        path: () => '/', anonymous: true, element: <MainLayout/>, children: [
            {
                path: () => '/', anonymous: true, element: <div>Home</div>
            }
        ]
    },

]

export const AppRouter = () => {
    return <RouterProvider router={createHashRouter(routes)}/>;
};