import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword } from '@/utils/password'
import { signJWT } from '@/utils/jwt'
import { LoginRequest, AuthResponse } from '@/types/auth'
import { z } from 'zod'
import prisma from '@/lib/db'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

export async function POST(
    request: NextRequest
): Promise<NextResponse<AuthResponse | { error: string }>> {
    try {
        const body: LoginRequest = await request.json()

        const validation = loginSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.errors[0].message },
                { status: 400 }
            )
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
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        const isValidPassword = await verifyPassword(body.password, user.password)
        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        const token = signJWT({ userId: user.id })

        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(
            { user: userWithoutPassword, token },
            { status: 200 }
        )
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Failed to login' },
            { status: 400 }
        )
    }
}   