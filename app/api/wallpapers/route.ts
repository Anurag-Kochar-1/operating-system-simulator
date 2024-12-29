import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod';
import { createResponse } from '@/utils/api-response';

export async function GET() {
    try {
        const wallpapers = await prisma.wallpaper.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(createResponse({
            data: wallpapers,
            statusMessage: "Wallpaper fetched successfully"
        }), {
            status: 200
        });

    } catch (error) {
        console.error('Error fetching wallpapers:', error);
        return NextResponse.json(createResponse({
            error: "Failed to fetch wallpapers",

            statusMessage: "Failed to fetch wallpapers"
        }), {
            status: 500
        })
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
            statusMessage: "Wallpaper created successfully"
        }), {
            status: 201
        });
    } catch (error) {
        return NextResponse.json(createResponse({
            error: "Failed to create wallpaper",
            statusMessage: "Failed to create wallpaper"
        }), {
            status: 500
        })
    }
}