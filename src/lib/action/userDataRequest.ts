function getBytesInStorageRequest() {
    return new Request('/api/user-data/bytesInStorage', {
        method: 'GET'
    });
}

function getUsernameRequest(userId: number) {
    return new Request(`/api/user-data/username?userId=${userId}`, {
        method: 'GET'
    });
}

export {
    getBytesInStorageRequest,
    getUsernameRequest
};