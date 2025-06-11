export type Chunk = {
    id: number,
    ownerId: number,
    originalFileName: string,
    createdOn: number,
    lastModified: number,
    sizeBytes: number,
    mimeType: string,
    shareOption: 'PRIVATE' | 'SHARE_WITH_ALL_WITH_LINK' | 'SHARE_WITH_USER',
    shareWith: number[],
    shareLink: string,
    isFavorite: boolean,
    directory: number
};