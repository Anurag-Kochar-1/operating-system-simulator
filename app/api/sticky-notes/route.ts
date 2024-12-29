import prisma from "@/lib/db";
import { createResponse } from "@/utils/api-response";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const userId = request.headers.get('userId');
        const user = await prisma.user.findUnique({
            where: {
                id: userId!,
            },
        });

        if (!user) {
            return NextResponse.json(createResponse({
                error: "User not found",
                statusMessage: "User not found"
            }), { status: 404 });
        }


        const notes = await prisma.stickyNote.findMany({
            where: {
                userId: userId!,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(createResponse({
            statusMessage: "Notes retrieved successfully",
            data: notes
        }), { status: 201 })
    } catch (error) {
        return NextResponse.json(createResponse({
            error: "Error retrieving notes",
            statusMessage: "Error retrieving notes"
        }), { status: 500 })
    }
}   