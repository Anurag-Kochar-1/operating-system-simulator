export type ApiResponse<T> = {
    statusMessage: string
    data: T | null
    error?: string | null
}

export function createResponse<T>(
    {
        data = null,
        error = null, statusMessage = "Success",
    }: {
        data?: T | null,
        statusMessage: string,
        error?: string | null
    }
): ApiResponse<T> {
    return {
        statusMessage,
        data,
        error
    }
}