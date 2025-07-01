import type { DownloadSelectedRequestPayload } from "../definition/checkedEntitiesOptionsTypes";

function getDownloadSelectedRequest(payload: DownloadSelectedRequestPayload) {
    return new Request('/api/file/bulk', {
        method: 'POST',
        headers: [
            ['Content-Type', 'application/json']
        ],
        body: JSON.stringify(payload)
    });
}

export {
    getDownloadSelectedRequest
}