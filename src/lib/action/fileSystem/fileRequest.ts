import { addRequestParams } from "../../util/request";

function fileDownloadRequest(
    requestParams: { fileId: number }
): Request {
    const urlWithParams = addRequestParams('/api/file', requestParams);
    return new Request(urlWithParams, {
        method: 'GET',
    });
}

export {
    fileDownloadRequest
};

