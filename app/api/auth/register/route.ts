import { NextRequest, NextResponse } from 'next/server'
import { signJWT } from '@/utils/jwt'
import { RegisterRequest, AuthResponse } from '@/types/auth'
import { z } from 'zod'
import prisma from '@/lib/db'
import { hashPassword } from '@/utils/password'

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(
    request: NextRequest
): Promise<NextResponse<AuthResponse | { error: string }>> {
    try {
        const body: RegisterRequest = await request.json()

        const validation = registerSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.errors[0].message },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        const hashedPassword = await hashPassword(body.password)
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
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
                theme: 'dark',
                wallpaperId: null,
            },
        })

        const token = signJWT({ userId: user.id })

        return NextResponse.json({ token }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Input validation failed' },
            { status: 400 }
        )
    }
}