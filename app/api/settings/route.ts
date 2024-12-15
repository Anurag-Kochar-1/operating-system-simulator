import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';
import { createResponse } from '@/utils/api-response';

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get('userId');
        if (!userId) {
            return NextResponse.json(createResponse({
                error: "Unauthorized",
                statusCode: 401,
                statusMessage: "Unauthorized"
            }));
        }

        const settings = await prisma.settings.findUnique({
            where: { userId },
            include: {
                wallpaper: {
                    select: {
                        id: true,
                        name: true,
                        thumbnail: true,
                    },
                },
            },
        });

        if (!settings) {
            const defaultSettings = await prisma.settings.create({
                data: {
                    userId,
                    theme: 'dark',
                },
                include: {
                    wallpaper: {
                        select: {
                            id: true,
                            name: true,
                            thumbnail: true,
                        },
                    },
                },
            });
            return NextResponse.json(createResponse({
                data: defaultSettings,
                statusCode: 201,
                statusMessage: "Default setting Created",
            }))
        }

        return NextResponse.json(createResponse({
            data: settings,
            statusCode: 200,
            statusMessage: "Settings retrieved successfully"
        }));
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(createResponse({
            error: "Failed to fetch settings",
            statusCode: 400,
            statusMessage: "Failed to fetch settings"
        }))
    }
}

const updateSettingsSchema = z.object({
    theme: z.enum(['dark', 'light']).optional(),
    wallpaperId: z.string().uuid().nullable().optional(),
});

export async function PATCH(request: NextRequest) {
    try {
        const userId = request.headers.get('userId');
        if (!userId) {
            return NextResponse.json(createResponse({
                statusCode: 401,
                statusMessage: "Unauthorized",
                error: "Unauthorized"
            }))
        }

        const body = await request.json();
        const validation = updateSettingsSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(createResponse({
                error: validation.error.errors[0].message,
                statusMessage: validation.error.errors[0].message,
                statusCode: 400
            }))
        }

        if (body.wallpaperId) {
            const wallpaper = await prisma.wallpaper.findUnique({
                where: { id: body.wallpaperId },
            });
            if (!wallpaper) {

                return NextResponse.json(createResponse({
                    error: "Wallpaper not found",
                    statusMessage: "Wallpaper not found",
                    statusCode: 400
                }))

            }
        }

        const updatedSettings = await prisma.settings.upsert({
            where: { userId },
            create: {
                userId,
                theme: body.theme || 'dark',
                wallpaperId: body.wallpaperId,
            },
            update: {
                theme: body.theme,
                wallpaperId: body.wallpaperId,
            },
            include: {
                wallpaper: {
                    select: {
                        id: true,
                        name: true,
                        thumbnail: true,
                    },
                },
            },
        });

        return NextResponse.json(createResponse({
            data: updatedSettings,
            statusCode: 200,
            statusMessage: "Settings updated successfully"
        }));
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}