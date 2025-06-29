function getUsersFromShareWithRequest(fileId: number): Request {
    return new Request(`/api/file-sharing/share_with?fileId=${fileId}`, {
        method: 'GET',
    });
}

function removeUserFromShareWithRequest(fileId: number, userIdReceiver: number): Request {
    return new Request(`/api/file-sharing/share_with?fileId=${fileId}&userIdReceiver=${userIdReceiver}`, {
        method: 'DELETE',
    });
}

function addUserToShareWithRequest(fileId: number, userIdReceiver: number): Request {
    return new Request(`/api/file-sharing/share_with?fileId=${fileId}&userIdReceiver=${userIdReceiver}`, {
        method: 'POST',
    });
}

function searchUsersRequest(username: string, fileIdToShare: number, searchUsersAbortController: AbortController) {
    return new Request(`/api/users?username=${username}&fileIdToShare=${fileIdToShare}`, {
        method: 'GET',
        signal: searchUsersAbortController.signal
    });
}

function changeShareOptionRequest(
    fileId: number,
    newShareOption: 'PRIVATE' | 'SHARE_WITH_ALL_WITH_LINK' | 'SHARE_WITH_USER') {
    return new Request(`/api/file-sharing/share_option?fileId=${fileId}&newShareOption=${newShareOption}`, {
        method: 'PATCH',
    });
}


export {
    getUsersFromShareWithRequest,
    removeUserFromShareWithRequest,
    addUserToShareWithRequest,
    searchUsersRequest,
    changeShareOptionRequest
};