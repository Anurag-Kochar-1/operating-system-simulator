import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
)

export interface CustomJWTPayload {
    userId: string
    [key: string]: string | number
}

export async function signJWT(payload: { userId: string }): Promise<string> {
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(JWT_SECRET)

    return token
}

export async function verifyJWT(token: string): Promise<CustomJWTPayload> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)

        if (!payload.userId || typeof payload.userId !== 'string') {
            throw new Error('Invalid token payload')
        }

        return payload as unknown as CustomJWTPayload
    } catch (error) {
        throw new Error('Invalid token')
    }
}