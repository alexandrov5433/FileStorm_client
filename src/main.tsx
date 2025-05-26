import './lib/style/index.sass'
import './bootstrap/main.js';
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import { store } from './lib/redux/store';
import { Provider } from 'react-redux';

import router from './router/router.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
