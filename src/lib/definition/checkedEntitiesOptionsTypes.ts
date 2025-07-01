export type CheckedEntitiesRenderOptions = {
    delete: boolean,
    download: boolean
}

export type CheckedEntityActionPayload = {
    entityId: number,
    entityType: 'chunk' | 'directory'
}

export type DownloadSelectedRequestPayload = {
    chunks: number[],
    directories: number[]
}