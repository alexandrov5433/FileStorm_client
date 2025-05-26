import { createBrowserRouter } from "react-router";

import Landing from "../component/landing/Landing";
import App from "../component/base/app/App";
import Login from "../component/account/login/Login";
import PageNotFound from "../component/error/pageNotFound/PageNotFound";
import AnonShare from "../component/share/anonShare/AnonShare";
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
                    { path: 'login', Component: Login },
                    { path: 'register', Component: Register }
                ]
            },
            {
                path: 'share', children: [
                    { path: 'anon', Component: AnonShare }
                ]
            },
            { path: 'storage', Component: Storage },


            { path: '*', Component: PageNotFound }
        ]
    }
]);

export default router;