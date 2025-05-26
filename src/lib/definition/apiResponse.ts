import type { AuthValidationResult } from "./authValidationResult";

export type ApiResponse = {
    message: string,
    payload?: any | AuthValidationResult[]
};