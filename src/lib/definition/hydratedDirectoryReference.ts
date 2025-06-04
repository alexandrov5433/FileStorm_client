import type { Chunk } from "./chunk";

export type HydratedDirectoryReference = {
    name: string,
    hydratedChunkRefs: Chunk[],
    simpleDirectoryRefs: { [key: string]: number }
}