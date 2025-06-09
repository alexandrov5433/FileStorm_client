import { addRequestParams } from "../../util/request";

function fileDownloadRequest(
    requestParams: { fileId: number }
): Request {
    const urlWithParams = addRequestParams('/api/file', requestParams);
    return new Request(urlWithParams, {
        method: 'GET',
    });
}

function deleteFileRequest(
    targetDirectoryPath: string,
    targetFileName: string
) {
    return new Request(addRequestParams('/api/file', {
        targetDirectoryPath, targetFileName
    }), {
        method: 'DELETE'
    });
}

export {
    fileDownloadRequest,
    deleteFileRequest
};

