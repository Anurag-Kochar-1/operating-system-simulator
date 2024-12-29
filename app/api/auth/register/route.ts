import { NextRequest, NextResponse } from 'next/server'
import { signJWT } from '@/utils/jwt'
import { RegisterRequest, AuthResponse } from '@/types/auth'
import { z } from 'zod'
import prisma from '@/lib/db'
import { hashPassword } from '@/utils/password'
import { ApiResponse, createResponse } from '@/utils/api-response'
import { UserType } from '@prisma/client'
import { cookies } from 'next/headers'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const dynamic = 'force-dynamic'

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
      }), { status: 400 })

    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingUser) {
      return NextResponse.json(
        createResponse({
          error: 'User already exists',
          statusMessage: 'User already exists'
        }),
        {
          status: 400
        }
      )
    }

    const hashedPassword = await hashPassword(body.password)
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        type: UserType.USER
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    await prisma.stickyNote.create({
      data: {
        userId: user.id,
        content: "Hey there 👋\nWelcome to your first sticky note!",
        theme: "amber"
      },
    });

    await prisma.settings.create({
      data: {
        userId: user.id,
        wallpaperId: null,
      },
    })


    const token = await signJWT({ userId: user.id })

    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })


    return NextResponse.json(createResponse({
      statusMessage: "Account created successfully",
      data: {
        token,
        user
      }
    }), { status: 201 })
  } catch (error) {
    return NextResponse.json(
      createResponse({
        error: 'Input validation failed',
        statusMessage: 'Input validation failed'
      }),
      {
        status: 400
      }
    )
  }
}