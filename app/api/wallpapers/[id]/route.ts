import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { createResponse } from '@/utils/api-response';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const wallpaper = await prisma.wallpaper.findUnique({
            where: { id: params.id },
        });

        if (!wallpaper) {
            return NextResponse.json(createResponse({
                error: "Wallpaper not found",

                statusMessage: "Wallpaper not found"
            }), { status: 404 });
        }

        return NextResponse.json(wallpaper);
    } catch (error) {
        return NextResponse.json(createResponse({
            error: "Failed to fetch wallpaper",

            statusMessage: "Failed to fetch wallpaper"
        }), { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const settingsUsingWallpaper = await prisma.settings.findFirst({
            where: { wallpaperId: params.id },
        });

        if (settingsUsingWallpaper) {
            return NextResponse.json(createResponse({
                error: "Wallpaper is currently in use",
                statusMessage: "Wallpaper is currently in use"
            }), { status: 400 })

        }

        await prisma.wallpaper.delete({
            where: { id: params.id },
        });

        return NextResponse.json(createResponse({
            error: "Wallpaper deleted successfully",
            statusMessage: "Wallpaper deleted successfully"
        }), { status: 200 })


    } catch (error) {
        console.error('Error deleting wallpaper:', error);
        return NextResponse.json(createResponse({
            error: "Failed to delete wallpaper",
            statusMessage: "Failed to delete wallpaper"
        }), {
            status: 500
        })

    }
}