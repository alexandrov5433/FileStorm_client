function getFavoriteRequest(): Request {
    return new Request('/api/favorite', {
        method: 'GET',
    });
}

export {
    getFavoriteRequest
};