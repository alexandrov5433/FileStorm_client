import { addRequestParams } from "../../util/request";

function getDirectoryRequest(
    requestParams: { [key: string]: string }
): Request {
    const urlWithParams = addRequestParams('/api/directory', requestParams);
    return new Request(urlWithParams, {
        method: 'GET',
    });
}

function createDirectoryRequest(
    targetDirectoryPath: string,
    newDirectoryName: string
): Request {
    const formData = new FormData();
    formData.append('targetDirectoryPath', targetDirectoryPath);
    formData.append('newDirectoryName', newDirectoryName);
    return new Request('/api/directory', {
        method: 'POST',
        body: formData
    });
}

export {
    getDirectoryRequest,
    createDirectoryRequest
};

