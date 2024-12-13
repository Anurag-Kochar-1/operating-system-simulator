// lib/jwt.ts
import jwt, { JwtPayload } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function signJWT(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '3d' })
}

export function verifyJWT(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
}