export type ApiResponse<T> = {
    statusCode: number
    statusMessage: string
    data: T | null
    error?: string | null
}

export function createResponse<T>(
    {
        data = null,
        error = null, statusCode = 200, statusMessage = "Success",
    }: {
        data?: T | null,
        statusCode: number,
        statusMessage: string,
        error?: string | null
    }
): ApiResponse<T> {
    return {
        statusCode,
        statusMessage,
        data,
        error
    }
}