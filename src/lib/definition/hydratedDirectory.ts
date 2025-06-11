import type { Chunk } from "./chunk";
import type { Directory } from "./directory";

export type HydratedDirectory = {
    id: number,
    ownerId: number,
    name: string,
    elementsCount: number;
    hydratedChunks: Chunk[],
    subdirectories: Directory[],
    parentDirectoryId: number,
    createdOn: number,
    lastModified: number
}