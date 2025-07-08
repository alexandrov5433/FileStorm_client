import type { Chunk } from "./chunk";

export type FileSearchResult = {
    directoryPath: Array<[number, string]> | null, // [[directoryId, directoryName]]
    chunk: Chunk
};

export type UserFileSearchResults = {
    myStorageResults: FileSearchResult[];
    sharedWithMeResults: FileSearchResult[];
};
