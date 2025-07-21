import { translateError } from "./errorMessages";

export const Response = {
    success: (data) => ({ data }),
    error: (code) => ({ code, error: translateError(code) })
}

