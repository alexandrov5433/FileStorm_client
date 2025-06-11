import { addRequestParams } from "../../util/request";

function fileDownloadRequest(
    requestParams: { fileId: number }
): Request {
    const urlWithParams = addRequestParams('/api/file', requestParams);
    return new Request(urlWithParams, {
        method: 'GET',
    });
}

function deleteFileRequest(fileId: number) {
    return new Request(`/api/file/${fileId}`, {
        method: 'DELETE'
    });
}

export {
    fileDownloadRequest,
    deleteFileRequest
};

