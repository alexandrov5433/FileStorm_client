import type { AuthValidationResult } from "./authValidationResult";
import type { Chunk } from "./chunk";
import type { Directory } from "./directory";
import type { HydratedDirectory } from "./hydratedDirectory";
import type { User } from "./user";

export type FetcherReturn = {
    status: number,
    msg?: string,
    payload?: any | AuthValidationResult[] | User | HydratedDirectory | Chunk | Directory,
    error?: Error 
};