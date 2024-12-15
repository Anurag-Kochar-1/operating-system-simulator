import { NextRequest, NextResponse } from 'next/server'
import { createResponse } from '@/utils/api-response'
import prisma from '@/lib/db'

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('userId')

        if (!userId) {
            return NextResponse.json(
                createResponse({
                    statusCode: 401,
                    statusMessage: 'Unauthorized',
                    error: 'Not authenticated'
                })
            )
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
            },
        })

        if (!user) {
            return NextResponse.json(
                createResponse({
                    statusCode: 404,
                    statusMessage: 'User not found',
                    error: 'User not found'
                })
            )
        }



        return NextResponse.json(
            createResponse({
                statusCode: 200,
                statusMessage: 'User fetched successfully',
                data: { user }
            })
        )
    } catch (error) {
        return NextResponse.json(
            createResponse({
                statusCode: 500,
                statusMessage: 'Internal server error',
                error: 'Failed to fetch user'
            })
        )
    }
}