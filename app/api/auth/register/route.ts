import { NextRequest, NextResponse } from 'next/server'
import { signJWT } from '@/utils/jwt'
import { RegisterRequest, AuthResponse } from '@/types/auth'
import { z } from 'zod'
import prisma from '@/lib/db'
import { hashPassword } from '@/utils/password'
import { ApiResponse, createResponse } from '@/utils/api-response'

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(
    request: NextRequest
): Promise<NextResponse<AuthResponse | ApiResponse<AuthResponse>>> {
    try {
        const body: RegisterRequest = await request.json()

        const validation = registerSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(createResponse({
                error: validation.error.errors[0].message,
                statusMessage: validation.error.errors[0].message,
                statusCode: 400
            }))
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        })

        if (existingUser) {
            return NextResponse.json(
                createResponse({
                    error: 'User already exists',
                    statusCode: 400,
                    statusMessage: 'User already exists'
                })
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

        const token = await signJWT({ userId: user.id })
        return NextResponse.json(createResponse({
            statusCode: 201,
            statusMessage: "Account created successfully",
            data: {
                token
            }
        }))
    } catch (error) {
        return NextResponse.json(
            createResponse({
                error: 'Input validation failed',
                statusCode: 400,
                statusMessage: 'Input validation failed'
            })
        )
    }
}