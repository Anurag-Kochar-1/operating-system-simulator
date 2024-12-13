// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from './utils/jwt'
import { createResponse } from './utils/api-response'

const publicPaths = ['/api/auth/login', '/api/auth/register', "/api/wallpapers"]

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    if (publicPaths.includes(path)) {
        return NextResponse.next()
    }

    if (path.startsWith('/api/')) {
        const authHeader = request.headers.get('Authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(createResponse({
                error: "Authentication required",
                statusCode: 401,
                statusMessage: "Authentication required"
            }))
        }

        const token = authHeader.split(' ')[1]

        try {
            const decoded = await verifyJWT(token)
            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('userId', decoded.userId)

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })
        } catch (error) {

            return NextResponse.json(createResponse({
                error: "Invalid or expired token",
                statusCode: 401,
                statusMessage: "Invalid or expired token"
            }))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/api/:path*'
    ]
}