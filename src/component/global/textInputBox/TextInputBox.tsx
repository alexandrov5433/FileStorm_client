import './textInputBox.sass';

import { useRef, useState, type ChangeEvent } from 'react';
import useEnterKeyBind from '../../../lib/hook/useEnterKeyBind';

export default function TextInputBox({
    funcToRunOnInputDone,
    funcToClose,
    funcInputValueValidator,
    textContent,
    textExtraNote,
    btnText
}: {
    funcToRunOnInputDone: Function
    funcToClose: Function,
    funcInputValueValidator: Function,
    textContent: string,
    textExtraNote?: string,
    btnText: string
}) {
    const submitBtnRef = useRef(null);

    const [isInputValid, setInputValid] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEnterKeyBind(submitBtnRef.current! as HTMLButtonElement);

    function validateInput(e: ChangeEvent) {
        const value = ((e.currentTarget as HTMLInputElement).value || '').trim();
        const validationResult = value == '' ? false : funcInputValueValidator(value);
        setInputValue(value);
        setInputValid(validationResult);
    }

    async function inputSubmission() {
        await funcToRunOnInputDone(inputValue);
        funcToClose();
    }

    return (
        <div id="text-input-box-main-container" className="anime-fade-in">
            <section>
                <button id="text-input-box-close-btn" className="custom-icon-btn" onClick={() => { funcToClose() }}>
                    <i className="bi bi-x-lg"></i>
                </button>
                <p className="textContent">{textContent}</p>
                <input type="text" onChange={validateInput} autoFocus/>
                <p className="textExtraNote">{textExtraNote || ''}</p>
                <button ref={submitBtnRef} id="submit-btn" className="custom-btn main-btn w-100" disabled={!isInputValid} onClick={inputSubmission}>{btnText}</button>
            </section>
        </div>
    );
}