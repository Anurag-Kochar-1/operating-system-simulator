import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from '@/utils/jwt'

const publicPaths = ['/api/auth/login', '/api/auth/register', '/api/wallpapers']

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    if (publicPaths.includes(path)) {
        return NextResponse.next()
    }

    if (path.startsWith('/api/')) {
        // Get token from httpOnly cookie
        const token = request.cookies.get('token')?.value

        if (!token) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            )
        }

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
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 401 }
            )
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/:path*']
}