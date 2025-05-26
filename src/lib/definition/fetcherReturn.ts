import type { AuthValidationResult } from "./authValidationResult";

export type FetcherReturn = {
    status: number,
    msg?: string,
    payload?: any | AuthValidationResult[],
    error?: Error 
};