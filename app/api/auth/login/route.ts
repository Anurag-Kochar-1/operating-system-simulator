import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword } from '@/utils/password'
import { signJWT } from '@/utils/jwt'
import { LoginRequest, AuthResponse } from '@/types/auth'
import { z } from 'zod'
import prisma from '@/lib/db'
import { ApiResponse, createResponse } from '@/utils/api-response'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

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
                statusCode: 400
            }))
        }

        const user = await prisma.user.findUnique({
            where: { email: body.email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        })

        if (!user) {
            return NextResponse.json(createResponse({
                statusCode: 401,
                error: "Invalid Credentials",
                statusMessage: 'Invalid Credentials'
            }))
        }

        const isValidPassword = await verifyPassword(body.password, user.password)
        if (!isValidPassword) {
            return NextResponse.json(createResponse({
                statusCode: 401,
                error: "Invalid Password",
                statusMessage: 'Invalid Password'
            }))
        }

        const token = await signJWT({ userId: user.id })

        return NextResponse.json(createResponse({
            statusCode: 200,
            statusMessage: 'Login Successful',
            data: { token }
        }))
    } catch (error) {
        return NextResponse.json(createResponse({
            statusCode: 400,
            error: "Failed to login",
            statusMessage: 'Failed to login'
        }))
    }
}   