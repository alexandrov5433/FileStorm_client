import './register.sass';

import { NavLink, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import accountRequest from '../../../lib/action/accountRequest';
import { useAppDispatch } from '../../../lib/redux/reduxTypedHooks';
import { setUser } from '../../../lib/redux/slice/user';
import type { User } from '../../../lib/definition/user';
import type { AuthValidationResult } from '../../../lib/definition/authValidationResult';

export default function Register() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const passwordRef = useRef(null);
    const repasswordRef = useRef(null);

    const [isRegisterBtnDisabled, setRegisterBtnDisabled] = useState(true);
    const [isPasswordVisible, setPasswordVisisble] = useState(false);

    const formStateInit = {
        username: {
            isValid: false,
            isTouched: false,
            message: ''
        },
        password: {
            isValid: false,
            isTouched: false,
            message: ''
        },
        repassword: {
            isValid: false,
            isTouched: false,
            message: ''
        },
        email: {
            isValid: false,
            isTouched: false,
            message: ''
        },
    };
    const [formState, setFormState] = useState(formStateInit);

    async function register() {
        setRegisterBtnDisabled(true);
        const formData = new FormData(formRef.current!);
        const res = await accountRequest(
            '/api/auth/register',
            'POST',
            formData
        );
        if (res.status === 200) {
            dispatch(setUser(res.payload as User));
            navigate('/storage');
        } else if (res.status === 400) {
            setFormState(oldState => {
                const newState = oldState;
                const authResult = res.payload as AuthValidationResult[];
                for (let i = 0; i < authResult.length; i++) {
                    const field = authResult[i];
                    (newState as any)[field.fieldName].isTouched = true;
                    (newState as any)[field.fieldName].isValid = field.isValid;
                    (newState as any)[field.fieldName].message = field.message;
                }
                return newState;
            });
        }
        setRegisterBtnDisabled(false);
    }

    useEffect(() => {
        const isError = [
            formState.username.isValid,
            formState.password.isValid,
            formState.repassword.isValid,
            formState.email.isValid
        ].includes(false);
        setRegisterBtnDisabled(isError);
    }, [
        formState.username.isValid,
        formState.password.isValid,
        formState.repassword.isValid,
        formState.email.isValid
    ]);

    function usernameValidator(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.currentTarget.value;
        const isValid = /^[A-Za-z0-9_]{1,30}$/.test(val);
        setFormState(state => {
            const newState = { ...state };
            newState.username.isTouched = true;
            newState.username.isValid = isValid;
            return newState;
        });
    }
    function emailValidator(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.currentTarget.value;
        let isValid = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(val);
        if (!val.slice(val.indexOf("@")).includes(".")) {
            //case asdf@asdf is invalid
            isValid = false;
        }
        setFormState(state => {
            const newState = { ...state };
            newState.email.isTouched = true;
            newState.email.isValid = isValid;
            return newState;
        });
    }
    function passwordsValidator() {
        const passwordVal = (passwordRef.current! as HTMLInputElement).value;
        const repasswordVal = (repasswordRef.current! as HTMLInputElement).value;
        const isPasswordValid = /^[A-Za-z0-9@_+?!-]{5,50}$/.test(passwordVal);
        let isRepasswordValid = new RegExp(`^${passwordVal}$`).test(repasswordVal);
        if (passwordVal === "") {
            isRepasswordValid = false;
        }
        setFormState(state => {
            const newState = { ...state };
            newState.password.isTouched = true;
            newState.password.isValid = isPasswordValid;
            newState.repassword.isTouched = true;
            newState.repassword.isValid = isRepasswordValid;
            return newState;
        });
    }

    function togglePasswordVisibility() {
        setPasswordVisisble(state => !state);
    }

    return (
        <form ref={formRef} id="auth-form">
            <div className="auth-form-content">
                <section className="mb-4">
                    <h6 id="filestorm-name">FileStorm</h6>
                    <h2>Register</h2>
                </section>
                <section className="mb-4">

                    <div className="input-group mb-4">
                        <div className={`input-group custom-input-group ${formState.username.isTouched ?
                            (formState.username.isValid ? '' : 'error') : ''
                            }`}>
                            <span className="input-group-text" id="basic-addon1">
                                <i className="bi bi-person-fill"></i>
                            </span>
                            <input onChange={usernameValidator} type="text" name="username" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <p className="auth-error-message">{formState.username.message}</p>
                    </div>

                    <div className="input-group mb-4">
                        <div className={`input-group custom-input-group ${formState.password.isTouched ?
                            (formState.password.isValid ? '' : 'error') : ''
                            }`}>
                            <span className="input-group-text" id="basic-addon1">
                                <i className="bi bi-key-fill"></i>
                            </span>
                            <input ref={passwordRef} onChange={passwordsValidator} type={isPasswordVisible ? 'text' : 'password'} name="password" className="form-control" placeholder="Password" aria-label="Password" />
                            <span onClick={togglePasswordVisibility} className="password-view-toggle">
                                {
                                    isPasswordVisible ?
                                        <i className="bi bi-eye-fill"></i>
                                        : <i className="bi bi-eye-slash-fill"></i>
                                }
                            </span>
                        </div>
                        <p className="auth-error-message">{formState.password.message}</p>
                    </div>

                    <div className="input-group mb-4">
                        <div className={`input-group custom-input-group ${formState.repassword.isTouched ?
                            (formState.repassword.isValid ? '' : 'error') : ''
                            }`}>
                            <span className="input-group-text" id="basic-addon1">
                                <i className="bi bi-key-fill"></i>
                            </span>
                            <input ref={repasswordRef} onChange={passwordsValidator} type={isPasswordVisible ? 'text' : 'password'} name="repassword" className="form-control" placeholder="Repeat Password" aria-label="Password" />
                        </div>
                        <p className="auth-error-message">{formState.repassword.message}</p>
                    </div>

                    <div className="input-group mb-4">
                        <div className={`input-group custom-input-group ${formState.email.isTouched ?
                            (formState.email.isValid ? '' : 'error') : ''
                            }`}>
                            <span className="input-group-text" id="basic-addon1">
                                <i className="bi bi-at"></i>
                            </span>
                            <input onChange={emailValidator} type="text" name="email" className="form-control" placeholder="Email" aria-label="Email" />
                        </div>
                        <p className="auth-error-message">{formState.email.message}</p>
                    </div>

                    <button type="button" onClick={register} disabled={isRegisterBtnDisabled} className="custom-btn main-btn">Register</button>
                </section>
                <section>
                    <hr />
                    <NavLink to="/account/login" className="custom-btn secondary-btn">Log In</NavLink>
                </section>
            </div>
        </form>
    );
}