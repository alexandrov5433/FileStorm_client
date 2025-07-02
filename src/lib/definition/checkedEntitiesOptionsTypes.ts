export type CheckedEntitiesRenderOptions = {
    delete: boolean,
    download: boolean
}

export type CheckedEntityActionPayload = {
    entityId: number,
    entityType: 'chunk' | 'directory'
}

export type CheckedEntitiesRequestPayload = {
    chunks: number[],
    directories: number[]
}