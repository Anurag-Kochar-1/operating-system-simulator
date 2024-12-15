import { NextResponse } from 'next/server'
import { createResponse } from '@/utils/api-response'

export const dynamic = 'force-dynamic'
export async function POST() {
    const response = NextResponse.json(
        createResponse({
            statusCode: 200,
            statusMessage: 'Logged out successfully',
            data: null
        })
    )

    response.cookies.set({
        name: 'token',
        value: '',
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    })

    return response
}