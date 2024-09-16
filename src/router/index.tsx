import {createHashRouter, RouteObject, RouterProvider} from "@trionesdev/commons-react";
import {SignInPage} from "@app/account/sign-in/page.tsx";
import {RouteConstants} from "./route.constants.ts";
import {MainLayout} from "@app/MainLayout.tsx";

const routes: RouteObject[] = [
    {...RouteConstants.ACCOUNT.SIGN_IN, element: <SignInPage/>},
    {
        path: () => '/', anonymous: true, element: <MainLayout/>, children: [
            {
                path: () => '/',anonymous: true, element: <div>Home</div>
            }
        ]
    }
]

export const AppRouter = () => {
    return <RouterProvider router={createHashRouter(routes)}/>;
};