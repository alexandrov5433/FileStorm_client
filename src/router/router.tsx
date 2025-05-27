import { createBrowserRouter } from "react-router";

import Landing from "../component/landing/Landing";
import App from "../component/base/app/App";
import Login from "../component/account/login/Login";
import PageNotFound from "../component/error/pageNotFound/PageNotFound";
import Register from "../component/account/register/Register";
import Storage from "../component/storage/Storage";
import Account from "../component/account/Account";

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            { index: true, Component: Landing },
            {
                path: 'account', Component: Account, children: [
                    { path: 'login', index: true, Component: Login },
                    { path: 'register', Component: Register }
                ]
            },
            { path: 'storage', Component: Storage },


            { path: '*', Component: PageNotFound }
        ]
    }
]);

export default router;