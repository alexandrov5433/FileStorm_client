import './textInputBox.sass';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useEnterKeyBind, useEscapeKeyBind } from '../../../lib/hook/useKeyBind';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/reduxTypedHooks';
import { closeTextInputBox } from '../../../lib/redux/slice/textInputBox';
import fetcher from '../../../lib/action/fetcher';
import { createDirectoryRequest } from '../../../lib/action/fileSystem/directoryRequest';
import { addSubdir, replaceChunkByIdWithNewChunk } from '../../../lib/redux/slice/directory';
import type { Directory } from '../../../lib/definition/directory';
import { validateFileAndDirName } from '../../../lib/util/validator';
import { getRenameFileRequest } from '../../../lib/action/fileSystem/fileRequest';
import type { Chunk } from '../../../lib/definition/chunk';
import { setMessage } from '../../../lib/redux/slice/messenger';
import { extractFileExtention, extractFileNameUntilExtention } from '../../../lib/util/file';

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
    const [requestLoading, setRequestLoading] = useState(false);

    useEnterKeyBind(submitBtnRef.current!);
    useEscapeKeyBind(closeBtnRef.current!);

    useEffect(() => {
        if (!textInputBoxState) {
            setDisplayTextInputBoxClass('hide-text-input-box');
            resetInputField();
        } else {
            setDisplayTextInputBoxClass('display-text-input-box');

            const startingInputValue = (textInputBoxState?.entityToRename as Chunk)?.originalFileName ?
                extractFileNameUntilExtention((textInputBoxState?.entityToRename as Chunk)?.originalFileName) : '';

            resetInputField(startingInputValue);
        }
    }, [textInputBoxState]);

    function inputChageListener(e: ChangeEvent<HTMLInputElement>) {
        setInputFieldTouched(true);
        const value = e.currentTarget?.value || '';
        setInputValue(value);
        if (textInputBoxState?.funcInputValueValidator) {
            validateInput(value);
        }
    }

    function validateInput(value: string) {
        let validationResult = true;
        if (!value || !value.trim()) {
            validationResult = false;
        } else if (textInputBoxState?.funcInputValueValidator) {
            validationResult = validatorsLibrary[textInputBoxState.funcInputValueValidator]?.(value) ?? false;
        }
        console.log(validationResult);
        
        setInputValid(validationResult);
    }

    function inputSubmission() {
        if (!textInputBoxState) return;
        actionsLibrary[textInputBoxState.funcToRunOnInputDone]?.(inputValue.trim());
    }

    function close() {
        resetInputField();
        dispatch(closeTextInputBox());
    }

    function resetInputField(startingInputValue = '') {
        setInputValue(startingInputValue);
        setInputFieldTouched(false);
        setInputValid(false);
    }

    const actionsLibrary = {
        'addNewDirectory': async (newDirName: string) => {
            setRequestLoading(true);
            const res = await fetcher(
                createDirectoryRequest(
                    dirPath[dirPath.length - 1][0],
                    newDirName
                )
            );
            if (res.status == 200) {
                // trigger refresh in my-storage
                dispatch(addSubdir(res.payload as Directory));
                close();
            } else {
                dispatch(setMessage({
                    title: 'Ooops...',
                    text: res.msg || 'A problem occurred. Please try again.',
                    type: 'negative',
                    duration: 5000
                }));
            }
            setRequestLoading(false);
        },
        'renameFile': async (newFileNameWithoutTheExtention: string) => {
            setRequestLoading(true);
            const res = await fetcher(getRenameFileRequest(
                textInputBoxState?.entityToRename?.id || 0,
                newFileNameWithoutTheExtention
            ));
            if (res.status === 200) {
                const updatedChunk = res.payload as Chunk;
                dispatch(replaceChunkByIdWithNewChunk({
                    idOfChunkToRemove: textInputBoxState?.entityToRename?.id || 0,
                    chunkToAdd: updatedChunk
                }));
                close();
            } else {
                dispatch(setMessage({
                    title: 'Ooops...',
                    text: res.msg || 'A problem occurred. Please try again.',
                    type: 'negative',
                    duration: 5000
                }));
            }
            setRequestLoading(false);
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
                <div className="input-element-container">
                    <input
                        autoFocus
                        ref={inputFieldRef}
                        type="text"
                        onChange={inputChageListener}
                        className={inputFieldTouched ? (isInputValid ? '' : 'false-input') : ''}
                        value={inputValue}
                    />
                    {
                        (textInputBoxState?.entityToRename as Chunk)?.originalFileName ?
                            <span>
                                {extractFileExtention((textInputBoxState?.entityToRename as Chunk)?.originalFileName || '')}
                            </span>
                            : ''
                    }
                </div>
                <p className="textExtraNote">{textInputBoxState?.textExtraNote || ''}</p>
                <button
                    ref={submitBtnRef}
                    id="submit-btn"
                    className="custom-btn main-btn w-100"
                    disabled={requestLoading ? true : (textInputBoxState?.funcInputValueValidator ? !isInputValid : false)}
                    onClick={inputSubmission}>
                    {requestLoading ? 'Loading...' : textInputBoxState?.btnText || 'Done'}
                </button>
            </section>
        </div>
    );
}