import { buildDirectoryPath } from "../../util/directory";
import { addRequestParams } from "../../util/request";

function getDirectoryRequest(
    targetDirectoryId: number
): Request {
    return new Request(`/api/directory/${targetDirectoryId}`, {
        method: 'GET',
    });
}

// server responds with Directory in the payload
function createDirectoryRequest(
    targetDirectoryId: number,
    newDirectoryName: string
): Request {
    const formData = new FormData();
    formData.append('targetDirectoryId', targetDirectoryId.toString());
    formData.append('newDirectoryName', newDirectoryName);
    return new Request('/api/directory', {
        method: 'POST',
        body: formData
    });
}

function deleteDirectory(directoryId: number) {
    return new Request(`/api/directory/${directoryId}`, {
            method: 'DELETE'
        }
    );
}

export {
    getDirectoryRequest,
    createDirectoryRequest,
    deleteDirectory
};

