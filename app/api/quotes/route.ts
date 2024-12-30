import prisma from "@/lib/db";
import { createResponse } from "@/utils/api-response";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
    try {
        const quotes = await prisma.quote.findMany()
        return NextResponse.json(createResponse({
            data: quotes,
            statusMessage: "Success",
        }), {
            status: 200,
        })

    } catch (error) {
        return NextResponse.json(createResponse({
            statusMessage: "Failed to fetch quotes",
            error: "Failed to fetch quotes",
        }), {
            status: 500,
        })
    }
}