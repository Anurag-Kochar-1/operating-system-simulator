import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';
import { createResponse } from '@/utils/api-response';

export async function GET() {
    try {
        const wallpapers = await prisma.wallpaper.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(wallpapers);
    } catch (error) {
        console.error('Error fetching wallpapers:', error);
        return NextResponse.json(createResponse({
            error: "Failed to fetch wallpapers",
            statusCode: 500,
            statusMessage: "Failed to fetch wallpapers"
        }))
    }
}

const wallpaperSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    thumbnail: z.string().min(1, 'Thumbnail is required'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = wallpaperSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const wallpaper = await prisma.wallpaper.create({
            data: {
                name: body.name,
                thumbnail: body.thumbnail,
            },
        });

        return NextResponse.json(createResponse({
            data: wallpaper,
            statusCode: 201,
            statusMessage: "Wallpaper created successfully"
        }));
    } catch (error) {
        return NextResponse.json(createResponse({
            error: "Failed to create wallpaper",
            statusCode: 500,
            statusMessage: "Failed to create wallpaper"
        }))
    }
}