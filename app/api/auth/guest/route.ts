import { NextRequest, NextResponse } from 'next/server'
import { signJWT } from '@/utils/jwt'
import { createResponse } from '@/utils/api-response'
import prisma from '@/lib/db'
import { UserType } from '@prisma/client'
import crypto from 'crypto'
import { hashPassword } from '@/utils/password'

export const dynamic = 'force-dynamic'

export async function POST(
    request: NextRequest
): Promise<NextResponse> {
    try {
        const guestId = crypto.randomBytes(4).toString('hex')
        const guestEmail = `guest_${guestId}@guest.com`
        const guestName = `Guest_${guestId}`
        const guestPassword = crypto.randomBytes(20).toString('hex')


        const hashedPassword = await hashPassword(guestPassword)
        const user = await prisma.user.create({
            data: {
                name: guestName,
                email: guestEmail,
                password: hashedPassword,
                type: UserType.GUEST
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        })

        await prisma.settings.create({
            data: {
                userId: user.id,
                wallpaperId: null,
            },
        })

        await prisma.stickyNote.create({
            data: {
                userId: user.id,
                content: "Hey there 👋\nWelcome to your first sticky note!",
                theme: "amber",
            },
        });

        const token = await signJWT({ userId: user.id })

        const response = NextResponse.json(
            createResponse({

                statusMessage: 'Guest account created successfully',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                }
            }),
            {
                status: 201
            }
        )

        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Guest login error:', error)
        return NextResponse.json(
            createResponse({
                statusMessage: 'Failed to create guest account',
                error: 'Failed to create guest account'
            }), { status: 500 }
        )
    }
}