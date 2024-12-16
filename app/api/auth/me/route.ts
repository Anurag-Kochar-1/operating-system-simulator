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

                    statusMessage: 'Unauthorized',
                    error: 'Not authenticated'
                }), { status: 401 }
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
                    statusMessage: 'User not found',
                    error: 'User not found'
                }), { status: 404 }
            )
        }



        return NextResponse.json(
            createResponse({

                statusMessage: 'User fetched successfully',
                data: { user }
            }), { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            createResponse({
                statusMessage: 'Internal server error',
                error: 'Failed to fetch user'
            }), { status: 500 }
        )
    }
}