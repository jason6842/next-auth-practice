import { getLoginToken } from "@/lib/auth/session";
import { createPost, fetchAllPosts } from "@/service/postService";
import { verifyToken } from "@/util/token";
import { NextResponse } from "next/server";

// creating a post
export async function POST(request: Request) {
    console.log("POST TEST")
    const { title, content } = await request.json();

    if (!title || !content) {
        return NextResponse.json({ message: "Missing required fields." },
            { status: 400 })
    }

    const token = await getLoginToken();
    if (!token) {
        return NextResponse.json({ message: "Please log in" }, { status: 401 })
    }

    const decoded = verifyToken(token);
    console.log("DECODED");
    if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const post = await createPost(title, content, decoded.userId);
    return NextResponse.json(post);
}

// get all posts
export async function GET() {
    // publicly accessible (doesn't require log in)
    const posts = await fetchAllPosts();

    return NextResponse.json(posts);

}

