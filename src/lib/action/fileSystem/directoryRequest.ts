import { addRequestParams } from "../../util/request";

export default function directoryRequest(
    url: string,
    method: 'GET',
    requestParams: { [key: string]: string }
): Request {
    const urlWithParams = addRequestParams(url, requestParams);
    return new Request(urlWithParams, {
        method,
    });
}

