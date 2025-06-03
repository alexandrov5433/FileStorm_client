import { useState, type ChangeEvent } from 'react';
import './textInputBox.sass';

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
    const [isInputValid, setInputValid] = useState(false);
    const [inputValue, setInputValue] = useState('');

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
                <button id="close-btn" className="custom-icon-btn" onClick={() => { funcToClose() }}>
                    <i className="bi bi-x-lg"></i>
                </button>
                <p className="textContent">{textContent}</p>
                <input type="text" onChange={validateInput}/>
                <p className="textExtraNote">{textExtraNote || ''}</p>
                <button id="submit-btn" className="custom-btn main-btn w-100" disabled={!isInputValid} onClick={inputSubmission}>{btnText}</button>
            </section>
        </div>
    );
}