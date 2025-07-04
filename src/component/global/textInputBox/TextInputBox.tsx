import './textInputBox.sass';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useEnterKeyBind, useEscapeKeyBind } from '../../../lib/hook/useKeyBind';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import { closeTextInputBox } from '../../../lib/redux/slice/textInputBox';
import fetcher from '../../../lib/action/fetcher';
import { createDirectoryRequest } from '../../../lib/action/fileSystem/directoryRequest';
import { addSubdir } from '../../../lib/redux/slice/directory';
import type { Directory } from '../../../lib/definition/directory';
import { validateFileAndDirName } from '../../../lib/util/validator';

export default function TextInputBox() {
    const dispatch = useAppDispatch();
    const textInputBoxState = useAppSelector(state => state.textInputBox);
    const { dirPath } = useAppSelector(state => state.directory);

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
            if (inputFieldRef.current) {
                inputFieldRef.current.focus();
            }
        } else {
            setDisplayTextInputBoxClass('display-text-input-box');
            resetInputField();
        }
    }, [textInputBoxState]);

    function validateInput(e: ChangeEvent) {
        setInputFieldTouched(true);
        const value = ((e.currentTarget as HTMLInputElement)?.value || '').trim();
        let validationResult = true;
        if (!value) {
            validationResult = false;
        } else if (textInputBoxState?.funcInputValueValidator) {
            validationResult = validatorsLibrary[textInputBoxState.funcInputValueValidator]?.(value) ?? false;
        }
        setInputValue(value);
        setInputValid(validationResult);
    }

    function inputSubmission() {
        if (!textInputBoxState) return;
        actionsLibrary[textInputBoxState.funcToRunOnInputDone]?.(inputValue);
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

    const actionsLibrary = {
        'addNewDirectory': async (newDirName: string) => {
            const res = await fetcher(
                createDirectoryRequest(
                    dirPath[dirPath.length - 1][0],
                    newDirName
                )
            );
            if (res.status == 200) {
                // trigger refresh in my-storage
                dispatch(addSubdir(res.payload as Directory));
            }
        }
    };

    const validatorsLibrary = {
        'validateFileAndDirName': validateFileAndDirName
    };

    return (
        <div id="text-input-box-main-container" className={`anime-fade-in ${displayTextInputBoxClass}`}>
            <section>
                <button ref={closeBtnRef} id="text-input-box-close-btn" className="custom-icon-btn" onClick={close}>
                    <i className="bi bi-x-lg"></i>
                </button>
                <p className="textContent">{textInputBoxState?.textContent || 'Enter value'}</p>
                <input autoFocus ref={inputFieldRef} type="text" onChange={
                    textInputBoxState?.funcInputValueValidator ?
                        validateInput : () => true
                } className={inputFieldTouched ? (isInputValid ? '' : 'false-input') : ''} />
                <p className="textExtraNote">{textInputBoxState?.textExtraNote || ''}</p>
                <button ref={submitBtnRef} id="submit-btn" className="custom-btn main-btn w-100" disabled={textInputBoxState?.funcInputValueValidator ? !isInputValid : false} onClick={inputSubmission}>{textInputBoxState?.btnText || 'Done'}</button>
            </section>
        </div>
    );
}