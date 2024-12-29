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
                statusMessage: "Unauthorized"
            }), {
                status: 401
            });
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

                statusMessage: "Default setting Created",
            }), { status: 201 })
        }

        return NextResponse.json(createResponse({
            data: settings,

            statusMessage: "Settings retrieved successfully"
        }), { status: 200 });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(createResponse({
            error: "Failed to fetch settings",

            statusMessage: "Failed to fetch settings"
        }), { status: 400 })
    }
}

const updateSettingsSchema = z.object({
    theme: z.enum(['DARK', 'LIGHT']).optional(), 
    wallpaperId: z.string().uuid().nullable().optional(),
});

export async function PATCH(request: NextRequest) {
    try {
        const userId = request.headers.get('userId');
        if (!userId) {
            return NextResponse.json(createResponse({

                statusMessage: "Unauthorized",
                error: "Unauthorized"
            }), { status: 401 })
        }

        const body = await request.json();
        const validation = updateSettingsSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(createResponse({
                error: validation.error.errors[0].message,
                statusMessage: validation.error.errors[0].message,
            }), { status: 400 })
        }

        if (body.wallpaperId) {
            const wallpaper = await prisma.wallpaper.findUnique({
                where: { id: body.wallpaperId },
            });
            if (!wallpaper) {

                return NextResponse.json(createResponse({
                    error: "Wallpaper not found",
                    statusMessage: "Wallpaper not found",

                }), { status: 400 })

            }
        }

        const updatedSettings = await prisma.settings.upsert({
            where: { userId },
            create: {
                userId,
                wallpaperId: body.wallpaperId,
            },
            update: {
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

            statusMessage: "Settings updated successfully"
        }), { status: 200 });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
            createResponse({
                error: 'Failed to update settings',
                statusMessage: 'Failed to update settings'
            }), {
            status: 500
        })
    }
}