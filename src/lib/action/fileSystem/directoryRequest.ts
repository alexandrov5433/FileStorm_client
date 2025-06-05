import { buildDirectoryPath } from "../../util/directory";
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

/**
 * Joins the dirPath Array and the dirName into a directory path string and retuns the build delete request. dirPath (['23', 'my_docs']) and dirName ('deleteThisDir') equal '23/my_docs/deleteThisDir'.
 * @param dirPath The dirPath Array, containing the containing the path to the directory - without including it as a last element -, which must be deleted.
 * @param dirName The name of the directory, which must be deleted.It must be found in the directory reached using the dirPath Array.
 */
function deleteDirectory(dirPath: Array<string | number>, dirName: string) {
    const fullDirPath = [...dirPath];
    fullDirPath.push(dirName);
    const targetDirectoryPath = buildDirectoryPath(fullDirPath);
    return new Request(
        addRequestParams('/api/directory', { targetDirectoryPath }),
        {
            method: 'DELETE'
        }
    );
}

export {
    getDirectoryRequest,
    createDirectoryRequest,
    deleteDirectory
};

