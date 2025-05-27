import './App.sass'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router'
import accountRequest from '../../../lib/action/accountRequest';
import { setGuest, setUser } from '../../../lib/redux/slice/user';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import type { User } from '../../../lib/definition/user';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const landing = useAppSelector(state => state.landing);

  useEffect(() => {
    const targetPath = window.location.pathname;
    navigate('/');

    (async () => {
      await checkCookieAndSessionData(targetPath);
      // isComponentFirstMount.current = false;
    })();
  }, []);

  async function checkCookieAndSessionData(targetPath: string) {
    const res = await accountRequest(
      '/api/auth/validate-session',
      'GET'
    );
    if (res.status === 200) {
      dispatch(setUser(res.payload as User));
      navigate(targetPath);
    } else {
      dispatch(setGuest());
      navigate('/account/login');
    }
  }

  return (
    <div id="app-main-container" className={landing.isMounted ? '' : 'hide-all-content'}>
      <Outlet />
    </div>
  )
}

export default App
