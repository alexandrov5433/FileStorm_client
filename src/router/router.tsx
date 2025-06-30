import { createBrowserRouter } from "react-router";

import Landing from "../component/landing/Landing";
import App from "../component/base/app/App";
import Login from "../component/account/login/Login";
import PageNotFound from "../component/error/pageNotFound/PageNotFound";
import Register from "../component/account/register/Register";
import Storage from "../component/storage/Storage";
import Account from "../component/account/Account";
import MyStorage from "../component/storage/view/myStorage/MyStorage";
import Favorite from "../component/storage/view/favorite/Favorite";
import SharedWithMe from "../component/storage/view/sharedWithMe/SharedWithMe";

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
            {
                Component: Storage, children: [
                    { index: true, path: 'my-storage', Component: MyStorage },
                    { path: 'favorite', Component: Favorite },
                    { path: 'shared-with-me', Component: SharedWithMe }
                ]
            },


            { path: '*', Component: PageNotFound }
        ]
    }
]);

export default router;