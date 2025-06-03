
/**
 * Appends request parameters to the end of an url-string.
 * @param url The base url on which to attach the request parameters.
 * @param requestParams An object of all request parameters to be attached to the request.
 * @returns The new url with the request parameters attached. If an empty object is supplied for requestParams the original base url is returned.
 */
function addRequestParams(url: string, requestParams: { [key: string]: string | number }): string {
    if (Object.keys(requestParams).length == 0) return url;
    let newUrl = `${url}?`;
    for (let [k, v] of Object.entries(requestParams)) {
        newUrl = newUrl + `${k}=${v}&`
    }
    newUrl = newUrl.substring(0, newUrl.length - 1); // remove the extra ampersand at the end
    return newUrl;
}

export {
    addRequestParams
};