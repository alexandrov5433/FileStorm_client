import "./anonShare.sass";

import { useRef } from "react";
import postRequest from "../../../lib/action/post";


export default function AnonShare() {
    const formRef = useRef(null);
    const progressBarRef = useRef(null);
    const progressTextRef = useRef(null);

    async function uploadFile() {
        const formData = new FormData(formRef.current!);
        const res = await postRequest(
            '/api/file/upload/anon',
            formData,
            progressTracker
        );
        console.log(res);
        
    }

    function progressTracker(progress: number) {
        (progressBarRef.current! as HTMLDivElement).style.width = `${progress}%`;
        (progressTextRef.current! as HTMLParagraphElement).textContent = progress.toFixed(2);
    }

    return (
        <div className="wrapper">
            <h1>Share A File</h1>
            <h3>Simple and anonymous</h3>
            <form ref={formRef}>
                <section>
                    <input type="file" placeholder="File" name="file" />
                    <button type="button" onClick={uploadFile}>Upload</button>
                </section>
            </form>
            <section id="progressContainer">
                <div id="progressBar" ref={progressBarRef}></div>
                <p id="progressText" ref={progressTextRef}></p>
            </section>
        </div>
    );
}