import type { AuthValidationResult } from "./authValidationResult";
import type { Chunk } from "./chunk";
import type { Directory } from "./directory";
import type { HydratedDirectory } from "./hydratedDirectory";
import type { UserFileSearchResults } from "./search";
import type { User } from "./user";

export type FetcherReturn = {
    status: number,
    msg?: string,
    payload?: AuthValidationResult[] | User | HydratedDirectory | Chunk | Chunk[] | Directory | number | UsersAsNameAndId | UserFileSearchResults | null,
    error?: Error 
};

export type UsersAsNameAndId = { [key: string]: number };