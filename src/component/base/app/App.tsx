import './App.sass'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router'
import accountRequest from '../../../lib/action/accountRequest';
import { setGuest, setUser } from '../../../lib/redux/slice/user';
import { useAppDispatch } from '../../../lib/redux/reduxTypedHooks';
import type { User } from '../../../lib/definition/user';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await checkCookieAndSessionData();
      // isComponentFirstMount.current = false;
    })();
  }, []);

  async function checkCookieAndSessionData() {
    const res = await accountRequest(
      '/api/auth/validate-session',
      'GET'
    );
    if (res.status === 200) {
      dispatch(setUser(res.payload as User));
      // const pathIncludedInRedirectListUser = /^\/login|\/register$/.test(window.location.pathname);
      // if (pathIncludedInRedirectListUser) {
      //   navigate('/');
      // }
      navigate('/storage');
    } else {
      dispatch(setGuest());
      // const pathIncludedInRedirectListGuest = /^\/profile|\/orders|\/add-product|\/edit-product\/.+|\/tickets|\/shopping-cart$/.test(window.location.pathname);
      // if (!isComponentFirstMount.current && pathIncludedInRedirectListGuest) {
      //   navigate('/');
      // }
      navigate('/account/login');
    }
  }

  return (
    <div id="app-main-container">
      <Outlet />
    </div>
  )
}

export default App
