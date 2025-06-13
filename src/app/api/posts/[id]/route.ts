import { getLoginToken } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { fetchPostById, removePostById, updatePostByIdDB } from "@/service/postService";
import { getUserFromToken } from "@/service/userService";
import { verifyToken } from "@/util/token";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const post = await fetchPostById(id);
    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const token = await getLoginToken();
    if (!token) {
        return NextResponse.json({ message: "Please log in" }, { status: 401 })
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id: id } });
    if (!post || post.authorId !== decoded.userId) return NextResponse.json({ error: "Post not found" }, { status: 403 });

    await removePostById(id);
    return NextResponse.json({ success: true })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getUserFromToken();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, content } = await req.json();

        const { id } = await params;
        const existingPost = await prisma.post.findUnique({ where: { id } });
        if (!existingPost || existingPost.authorId !== user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }

        await updatePostByIdDB(id, { title, content });
        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: "Failed to update." }, { status: 500 })
    }
}