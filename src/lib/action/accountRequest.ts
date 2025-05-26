import type { ApiResponse } from "../definition/apiResponse";
import type { FetcherReturn } from "../definition/fetcherReturn";

export default async function accountRequest(
    url: string,
    method: 'POST' | 'GET',
    body?: FormData
) {
    const returnVal: FetcherReturn = {
        status: 0
    };
    try {
        const req = await fetch(
            url,
            {
                method: method,
                body: body
            }
        );
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