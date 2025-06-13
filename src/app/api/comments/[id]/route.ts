import { removeCommentById } from "@/service/commentService";
import { getUserFromToken } from "@/service/userService";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const user = await getUserFromToken();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
    }

    try {
        await removeCommentById(params.id)
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 })
    }

}