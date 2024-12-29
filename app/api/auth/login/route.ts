import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword } from '@/utils/password'
import { signJWT } from '@/utils/jwt'
import { LoginRequest, AuthResponse } from '@/types/auth'
import { z } from 'zod'
import prisma from '@/lib/db'
import { ApiResponse, createResponse } from '@/utils/api-response'
import { cookies } from 'next/headers'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})


export const dynamic = 'force-dynamic'
export async function POST(
    request: NextRequest
): Promise<NextResponse<AuthResponse | ApiResponse<AuthResponse>>> {
    try {
        const body: LoginRequest = await request.json()

        const validation = loginSchema.safeParse(body)
        if (!validation.success) {

            return NextResponse.json(createResponse({
                error: validation.error.errors[0].message,
                statusMessage: validation.error.errors[0].message,

            }), { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email: body.email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                type: true,
            },
        })

        if (!user) {
            return NextResponse.json(createResponse({
                error: "Invalid Credentials",
                statusMessage: 'Invalid Credentials'
            }), { status: 401 })
        }

        const isValidPassword = await verifyPassword(body.password, user.password)
        if (!isValidPassword) {
            return NextResponse.json(createResponse({
                error: "Invalid Password",
                statusMessage: 'Invalid Password'
            }), { status: 401 })
        }

        const token = await signJWT({ userId: user.id })
        cookies().set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        })

        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(createResponse({
            statusMessage: 'Login Successful',
            data: { token, user: userWithoutPassword }
        }), { status: 200 })

    } catch (error) {
        return NextResponse.json(createResponse({
            error: "Failed to login",
            statusMessage: 'Failed to login'
        }), { status: 400 })
    }
}   