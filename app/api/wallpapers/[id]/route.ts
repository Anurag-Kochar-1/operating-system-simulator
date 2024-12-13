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
                statusCode: 404,
                statusMessage: "Wallpaper not found"
            }));
        }

        return NextResponse.json(wallpaper);
    } catch (error) {
        return NextResponse.json(createResponse({
            error: "Failed to fetch wallpaper",
            statusCode: 500,
            statusMessage: "Failed to fetch wallpaper"
        }))
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Check if wallpaper is in use
        const settingsUsingWallpaper = await prisma.settings.findFirst({
            where: { wallpaperId: params.id },
        });

        if (settingsUsingWallpaper) {
            return NextResponse.json(createResponse({
                error: "Wallpaper is currently in use",
                statusCode: 400,
                statusMessage: "Wallpaper is currently in use"
            }))

        }

        await prisma.wallpaper.delete({
            where: { id: params.id },
        });

        return NextResponse.json(createResponse({
            error: "Wallpaper deleted successfully",
            statusCode: 200,
            statusMessage: "Wallpaper deleted successfully"
        }))


    } catch (error) {
        console.error('Error deleting wallpaper:', error);
        return NextResponse.json(createResponse({
            error: "Failed to delete wallpaper",
            statusCode: 500,
            statusMessage: "Failed to delete wallpaper"
        }))

    }
}