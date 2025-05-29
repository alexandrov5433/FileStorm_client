import type { AuthValidationResult } from "./authValidationResult";
import type { HydratedDirectoryReference } from "./hydratedDirectoryReference";
import type { User } from "./user";

export type FetcherReturn = {
    status: number,
    msg?: string,
    payload?: any | AuthValidationResult[] | User | HydratedDirectoryReference,
    error?: Error 
};