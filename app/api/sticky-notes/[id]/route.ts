import prisma from "@/lib/db";
import { createResponse } from "@/utils/api-response";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = request.headers.get('userId');
        const body = await request.json();
        const { content } = body;

        if (!content) {
            return NextResponse.json(createResponse({
                error: "Content is required!",
                statusMessage: "Content is required!"
            }), { status: 404 });
        }

        if (content.length > 1000) {
            return NextResponse.json(createResponse({
                error: "Content is too long!",
                statusMessage: "Content is too long!"
            }), { status: 404 });
        }

        const note = await prisma.stickyNote.findUnique({
            where: {
                id: params.id,
                userId: userId!,
            },
        });

        if (!note) {
            return NextResponse.json(createResponse({
                error: "Note not found",
                statusMessage: "Note not found"
            }), { status: 404 });
        }

        const updatedNote = await prisma.stickyNote.update({
            where: {
                id: params.id,
            },
            data: {
                content,
            },
        });

        return NextResponse.json(createResponse({
            data: updatedNote,
            statusMessage: "Note updated successfully",
        }), { status: 201 });
    } catch (error) {
        console.error("Error updating note:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}