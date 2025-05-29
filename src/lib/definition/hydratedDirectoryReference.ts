import type { Chunk } from "./chunk";

export type HydratedDirectoryReference = {
    name: string,
    hydratedChunkRefs: { [key: string]: Chunk },
    simpleDirectoryRefs: { [key: string]: number }
}