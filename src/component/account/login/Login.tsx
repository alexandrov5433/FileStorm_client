import './login.sass';
import { useRef, useState } from 'react';

import { NavLink, useNavigate } from 'react-router';
import accountRequest from '../../../lib/action/accountRequest';
import type { AuthValidationResult } from '../../../lib/definition/authValidationResult';
import { useAppDispatch } from '../../../lib/redux/reduxTypedHooks';
import { setUser } from '../../../lib/redux/slice/user';
import type { User } from '../../../lib/definition/user';

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [isLoginBtnDisabled, setLoginBtnDisabled] = useState(true);
    const [isFormTouched, setFormTouched] = useState(false);
    const [isPasswordVisible, setPasswordVisisble] = useState(false);
    // const [generalLoginErrorMsg, setGeneralLoginErrorMsg] = useState('');

    const loginStateInit = {
        // generalError: false,
        username: {
            isValid: true,
            message: ''
        },
        password: {
            isValid: true,
            message: ''
        }
    };
    const [loginState, setLoginState] = useState(loginStateInit);

    async function login() {
        setLoginBtnDisabled(true);
        const formData = new FormData(formRef.current!);
        const res = await accountRequest(
            '/api/auth/login',
            'POST',
            formData
        );
        if (res.status === 200) {
            dispatch(setUser(res.payload as User))
            return navigate('/');
        } else if (res.status === 400) {
            const authRes: AuthValidationResult[] = res.payload;
            // setGeneralLoginErrorMsg(res.msg || '');
            setLoginState(() => {
                const newState = loginStateInit;
                // newState.generalError = true;
                authRes.forEach(auth => {
                    (newState as any)[auth.fieldName].isValid = auth.isValid;
                    (newState as any)[auth.fieldName].message = auth.message;
                });
                return newState;
            });
        } else {
            setLoginState(state => {
                const newState = { ...state };
                // newState.generalError = true;
                return newState;
            });
            // setGeneralLoginErrorMsg(res.msg || '');
        }
        setFormTouched(true);
        setLoginBtnDisabled(false);
    }

    function checkLoginFields() {
        const usernameVal = (usernameRef.current! as HTMLInputElement).value || '';
        const passwordVal = (passwordRef.current! as HTMLInputElement).value || '';
        setLoginBtnDisabled(!(usernameVal && passwordVal));
    }

    function togglePasswordVisibility() {
        setPasswordVisisble(state => !state);
    }

    return (
        <form ref={formRef} id="auth-form">
            <div className="auth-form-content">
                <section className="mb-4">
                    <h2>Log In</h2>
                </section>
                <section className="mb-4">

                    <div className="input-group mb-4">
                        <div className={`input-group custom-input-group ${isFormTouched ?
                            (loginState.username.isValid ? '' : 'error') : ''
                            }`}>
                            <span className="input-group-text" id="basic-addon1">
                                <i className="bi bi-person-fill"></i>
                            </span>
                            <input onChange={checkLoginFields} ref={usernameRef} type="text" name="username" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />

                        </div>
                        <p className="auth-error-message">{loginState.username.message}</p>
                    </div>

                    <div className="input-group mb-4">
                        <div className={`input-group custom-input-group ${isFormTouched ?
                            (loginState.password.isValid ? '' : 'error') : ''
                            }`}>
                            <span className="input-group-text" id="basic-addon1">
                                <i className="bi bi-key-fill"></i>
                            </span>
                            <input onChange={checkLoginFields} ref={passwordRef} type={isPasswordVisible ? 'text' : 'password'} name="password" className="form-control" placeholder="Password" aria-label="Password" />
                            <span onClick={togglePasswordVisibility} className="password-view-toggle">
                                {
                                    isPasswordVisible ?
                                        <i className="bi bi-eye-fill"></i>
                                        : <i className="bi bi-eye-slash-fill"></i>
                                }
                            </span>
                        </div>
                        <p className="auth-error-message">{loginState.password.message}</p>
                    </div>
                    {/* {
                    <div className={`input-group mb-4 ${isFormTouched ?
                            (loginState.generalError ? 'error' : '') : ''
                        }`}>
                        <p className="auth-error-message">{generalLoginErrorMsg}</p>
                    </div>  
                    } */}

                    <button type="button" className="custom-btn" onClick={login} disabled={isLoginBtnDisabled}>Log in</button>
                </section>
                <section>
                    <hr />
                    <NavLink to="/account/register" className="custom-btn btn-secondary">Register</NavLink>
                </section>
            </div>
        </form>
    );
}