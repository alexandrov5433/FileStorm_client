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

function getPublicFileDownloadRequest(fileId: number) {
    return new Request(`/api/public/file/${fileId}/download`, {
        method: 'GET'
    });
};
function getPublicFileDataRequest(fileId: number) {
    return new Request(`/api/public/file/${fileId}/data`, {
        method: 'GET'
    });
};

function getSearchUserFilesRequest(searchValue: string) {
    return new Request(`/api/search/file?searchValue=${searchValue || ''}`, {
        method: 'GET'
    });
}

export {
    fileDownloadRequest,
    deleteFileRequest,
    getRenameFileRequest,
    getPublicFileDownloadRequest,
    getPublicFileDataRequest,
    getSearchUserFilesRequest
};

