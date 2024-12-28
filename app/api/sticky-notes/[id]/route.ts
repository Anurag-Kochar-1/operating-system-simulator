import prisma from "@/lib/db";
import { createResponse } from "@/utils/api-response";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = request.headers.get('userId');
        let body;
        try {
            body = await request.json();
        } catch (error) {
            return NextResponse.json({ error: "Invalid or empty request body" }, { status: 400 });
        }

        const { content } = body || {};

        if (!content || typeof content !== 'string') {
            return NextResponse.json(createResponse({
                error: "Content is required and must be a string",
                statusMessage: "Content is required and must be a string"
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
                userId: userId!,
            },
            data: {
                content,
            },
        });

        return NextResponse.json(createResponse({
            data: "updatedNote",
            statusMessage: "Note updated successfully",
        }), { status: 201 });
    } catch (error) {
        console.error("Error updating note:", error);
        return NextResponse.json(createResponse({
            error: "Error updating note",
            statusMessage: "Error updating note"
        }), { status: 500 });
    }
}