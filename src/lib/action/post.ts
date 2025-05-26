import type { FetcherReturn } from "../definition/fetcherReturn";

export default async function postRequest(
    url: string,
    body: FormData,
    progressTracker: (progress: number) => void,
    headersObj?: { //TODO: remove headersObj?
        [key: string]: string
    }
) {
    return new Promise((resolve, reject) => {
        const ret: FetcherReturn = {
            status: 0
        }
        try {
            const xml = new XMLHttpRequest();
            xml.open('POST', url);
            xml.upload.onprogress = e => {
                progressTracker((e.loaded / e.total) * 100);
            };
            xml.onload = e => {
                ret.status = xml.status;
                resolve(ret);
            };
            xml.send(body);
        } catch (e) {
            ret.status = 0;
            ret.error = e as Error;
            ret.payload = null;
            reject(ret);
        }
    });
}