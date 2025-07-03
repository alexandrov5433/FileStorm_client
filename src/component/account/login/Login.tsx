import './login.sass';
import { useRef, useState } from 'react';

import { NavLink, useNavigate } from 'react-router';
import accountRequest from '../../../lib/action/accountRequest';
import type { AuthValidationResult } from '../../../lib/definition/authValidationResult';
import { useAppDispatch } from '../../../lib/redux/reduxTypedHooks';
import { setUser } from '../../../lib/redux/slice/user';
import type { User } from '../../../lib/definition/user';
import { useEnterKeyBind } from '../../../lib/hook/useKeyBind';

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginBtnRef = useRef(null);
    const formRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    useEnterKeyBind(loginBtnRef.current! as HTMLButtonElement);

    const [isLoginBtnDisabled, setLoginBtnDisabled] = useState(true);
    const [isFormTouched, setFormTouched] = useState(false);
    const [isPasswordVisible, setPasswordVisisble] = useState(false);

    const loginStateInit = {
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
            return navigate('/my-storage');
        } else if (res.status === 400) {
            const authRes: AuthValidationResult[] = res.payload as AuthValidationResult[];
            setLoginState(() => {
                const newState = loginStateInit;
                authRes.forEach(auth => {
                    (newState as any)[auth.fieldName].isValid = auth.isValid;
                    (newState as any)[auth.fieldName].message = auth.message;
                });
                return newState;
            });
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
            <div className="auth-form-content anime-fade-in">
                <section className="mb-4">
                    <h6 id="filestorm-name">FileStorm</h6>
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

                    <button ref={loginBtnRef} onClick={login} type="button" className="custom-btn main-btn" disabled={isLoginBtnDisabled}>Log in</button>
                </section>
                <section>
                    <hr />
                    <NavLink to="/account/register" className="custom-btn secondary-btn">Register</NavLink>
                </section>
            </div>
        </form>
    );
}