import type { CheckedEntitiesRequestPayload } from "../definition/checkedEntitiesOptionsTypes";

function getDownloadSelectedRequest(payload: CheckedEntitiesRequestPayload) {
    return new Request('/api/file/bulk', {
        method: 'POST',
        headers: [
            ['Content-Type', 'application/json']
        ],
        body: JSON.stringify(payload)
    });
}

function getDeleteSelectedRequest(payload: CheckedEntitiesRequestPayload) {
    return new Request('/api/file/bulk', {
        method: 'DELETE',
        headers: [
            ['Content-Type', 'application/json']
        ],
        body: JSON.stringify(payload)
    });
}

export {
    getDownloadSelectedRequest,
    getDeleteSelectedRequest
}