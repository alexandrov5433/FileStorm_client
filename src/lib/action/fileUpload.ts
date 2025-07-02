import type { ApiResponse } from "../definition/apiResponse";
import type { FetcherReturn } from "../definition/fetcherReturn";

export default async function fileUpload(
    body: FormData,
    progressTracker: (progress: number) => void
) {
    return new Promise((resolve, reject) => {
        const ret: FetcherReturn = {
            status: 0
        }
        try {
            const xml = new XMLHttpRequest();
            xml.open('POST', '/api/file');
            xml.upload.onprogress = e => {
                progressTracker(Number(((e.loaded / e.total) * 100).toFixed(0)));
            };
            xml.onload = () => {
                ret.status = xml.status;
                const response = JSON.parse(xml.response) as ApiResponse;
                ret.msg = response?.message || '';
                ret.payload = response?.payload || {};
                resolve(ret);
            };
            xml.send(body);
        } catch (e) {
            ret.status = 0;
            ret.msg = (e as Error).message;
            ret.error = e as Error;
            ret.payload = null;
            reject(ret);
        }
    });
}