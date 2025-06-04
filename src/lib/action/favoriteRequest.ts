function getFavoriteRequest(): Request {
    return new Request('/api/favorite', {
        method: 'GET',
    });
}

function markFileAsFavorite(fileId: number): Request {
    return new Request(`/api/favorite/${fileId}`, {
        method: 'POST'
    });
}

function removeFileFromFavorite(fileId: number): Request {
    return new Request(`/api/favorite/${fileId}`, {
        method: 'DELETE'
    });
}

export {
    getFavoriteRequest,
    markFileAsFavorite,
    removeFileFromFavorite
};