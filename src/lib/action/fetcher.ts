import type { ApiResponse } from "../definition/apiResponse";
import type { FetcherReturn } from "../definition/fetcherReturn";

export default async function fetcher(request: Request, abortController?: AbortController) {
    const returnVal: FetcherReturn = {
        status: 0
    };
    try {
        let req;
        if (abortController) {
            req = await fetch(Object.assign(request, { signal: abortController.signal }));
        } else {
            req = await fetch(request);
        }
        returnVal.status = req.status;
        const apiRes: ApiResponse = await req.json();
        returnVal.msg = apiRes.message;
        returnVal.payload = apiRes.payload || null;
    } catch (e) {
        returnVal.status = 0;
        returnVal.msg = (e as Error).message;
        returnVal.payload = null;
    }
    return returnVal;
}