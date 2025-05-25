export type TActionResult<T> = {
    validationErrors?: Record<string, string[]>;
    serverError?: unknown;
    data?: T;
}