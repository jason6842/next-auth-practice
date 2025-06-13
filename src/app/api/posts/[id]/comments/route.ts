import { getLoginToken } from "@/lib/auth/session";
import { createComment } from "@/service/commentService";
import { verifyToken } from "@/util/token";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { content, postId } = await request.json();
    if (!postId || !content) {
        return NextResponse.json({ message: "Missing Fields." }, { status: 400 });
    }

    const token = await getLoginToken();
    if (!token) {
        return NextResponse.json({ message: "Please log in" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const comment = await createComment(postId, decoded.userId, content);
    return NextResponse.json(comment);
}