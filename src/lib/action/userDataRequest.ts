function getBytesInStorageRequest() {
    return new Request('/api/user-data/bytesInStorage', {
        method: 'GET'
    });
}

export {
    getBytesInStorageRequest
};