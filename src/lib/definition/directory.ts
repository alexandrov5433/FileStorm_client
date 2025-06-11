export type Directory = {
    id: number,
    ownerId: number,
    name: string,
    elementsCount: number;
    chunks: number[],
    subdirectories: number[],
    parentDirectoryId: number,
    createdOn: number,
    lastModified: number
};