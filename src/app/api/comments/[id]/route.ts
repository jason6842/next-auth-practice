import { prisma } from "@/lib/prisma";
import { removeCommentById, updateCommentByIdDB } from "@/service/commentService";
import { getUserFromToken } from "@/service/userService";
import { NextResponse } from "next/server";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getUserFromToken();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
    }

    try {
        const id = (await params).id;
        await removeCommentById(id)
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 })
    }

}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getUserFromToken();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
    }

    try {
        const newContent = await req.json();

        const { id } = await params;
        const existingComment = await prisma.comment.findUnique({ where: { id } });
        if (!existingComment || existingComment.authorId !== user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }

        await updateCommentByIdDB(id, newContent);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Failed to update." }, { status: 500 })
    }
}