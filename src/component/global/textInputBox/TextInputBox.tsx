import './textInputBox.sass';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useEnterKeyBind, useEscapeKeyBind } from '../../../lib/hook/useKeyBind';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import { closeTextInputBox } from '../../../lib/redux/slice/textInputBox';

export default function TextInputBox() {
    const dispatch = useAppDispatch();
    const textInputBoxState = useAppSelector(state => state.textInputBox);
    
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);
    const inputFieldRef = useRef<HTMLInputElement>(null);

    const [displayTextInputBoxClass, setDisplayTextInputBoxClass] = useState('hide-text-input-box');
    const [isInputValid, setInputValid] = useState(false);
    const [inputFieldTouched, setInputFieldTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEnterKeyBind(submitBtnRef.current!);
    useEscapeKeyBind(closeBtnRef.current!);

    useEffect(() => {
        if (!textInputBoxState) {
            setDisplayTextInputBoxClass('hide-text-input-box');
            resetInputField();
        } else {
            setDisplayTextInputBoxClass('display-text-input-box');
            resetInputField();
        }
    }, [textInputBoxState]);

    function validateInput(e: ChangeEvent) {
        setInputFieldTouched(true);
        const value = ((e.currentTarget as HTMLInputElement).value || '').trim();
        const validationResult = value == '' ? false : (textInputBoxState?.funcInputValueValidator ? textInputBoxState.funcInputValueValidator(value) : true);
        setInputValue(value);
        setInputValid(validationResult);
    }

    async function inputSubmission() {
        await textInputBoxState?.funcToRunOnInputDone(inputValue);
        close();
    }
    
    function close() {
        setInputValue('');
        resetInputField();
        dispatch(closeTextInputBox());
    }
    
    function resetInputField() {
        if (inputFieldRef.current) {
            inputFieldRef.current.value = '';
        }
        setInputFieldTouched(false);
        setInputValid(false);
    }

    return (
        <div id="text-input-box-main-container" className={`anime-fade-in ${displayTextInputBoxClass}`}>
            <section>
                <button ref={closeBtnRef} id="text-input-box-close-btn" className="custom-icon-btn" onClick={close}>
                    <i className="bi bi-x-lg"></i>
                </button>
                <p className="textContent">{textInputBoxState?.textContent || 'Enter value'}</p>
                <input ref={inputFieldRef} type="text" onChange={
                    textInputBoxState?.funcInputValueValidator ?
                    validateInput : () => true
                } autoFocus className={ inputFieldTouched ? (isInputValid ? '' : 'false-input') : ''} />
                <p className="textExtraNote">{textInputBoxState?.textExtraNote || ''}</p>
                <button ref={submitBtnRef} id="submit-btn" className="custom-btn main-btn w-100" disabled={textInputBoxState?.funcInputValueValidator ? !isInputValid : false} onClick={inputSubmission}>{textInputBoxState?.btnText || 'Done'}</button>
            </section>
        </div>
    );
}