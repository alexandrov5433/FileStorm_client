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

function getRenameFileRequest(fileId: number, newFileNameWithoutTheExtention: string) {
    return new Request(`/api/file/${fileId}?newFileNameWithoutTheExtention=${newFileNameWithoutTheExtention}`, {
        method: 'PATCH'
    });
}

export {
    fileDownloadRequest,
    deleteFileRequest,
    getRenameFileRequest
};

