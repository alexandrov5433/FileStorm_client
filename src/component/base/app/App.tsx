import './App.sass'
import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router'
import accountRequest from '../../../lib/action/accountRequest';
import { setGuest, setUser } from '../../../lib/redux/slice/user';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import type { User } from '../../../lib/definition/user';
import Messenger from '../../global/messenger/Messenger';
import { setWindowHistoryLengthOnAppEntry } from '../../../lib/redux/slice/breadcrumbs';

function App() {
  const dispatch = useAppDispatch();
  const landing = useAppSelector(state => state.landing);
  const navigate = useNavigate();
  const location = useLocation();

  const componentFirstMount = useRef(true);

  useEffect(() => {
    dispatch(setWindowHistoryLengthOnAppEntry(window.history.length));
    console.log(window.history);
    
    const targetPath = location.pathname;
    navigate('/');

    (async () => {
      await checkCookieAndSessionData(targetPath);
      componentFirstMount.current = false;
    })();
  }, []);

  useEffect(() => {
    if (componentFirstMount.current) return;
    if (location.pathname == '/') {
      navigate('/my-storage');
    }
  }, [location.pathname]);

  async function checkCookieAndSessionData(targetPath: string) {
    const res = await accountRequest(
      '/api/auth/validate-session',
      'GET'
    );
    if (res.status === 200) {
      dispatch(setUser(res.payload as User));
      navigate(targetPath == '/' ? '/my-storage' : targetPath);
    } else {
      dispatch(setGuest());
      navigate('/account/login');
    }
  }

  return (
    <div id="app-main-container" className={landing.isMounted ? '' : 'hide-all-content'}>
      <Outlet />
      <Messenger/>
    </div>
  )
}

export default App
