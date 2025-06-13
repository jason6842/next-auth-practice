import { getLoginToken } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { fetchPostById, removePostById } from "@/service/postService";
import { verifyToken } from "@/util/token";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const post = await fetchPostById(id);
    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const token = await getLoginToken();
    if (!token) {
        return NextResponse.json({ message: "Please log in" }, { status: 401 })
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const post = await prisma.post.findUnique({ where: { id: params.id } });
    if (!post || post.authorId !== decoded.userId) return NextResponse.json({ error: "Post not found" }, { status: 403 });

    await removePostById(params.id);
    return NextResponse.json({ success: true })
}