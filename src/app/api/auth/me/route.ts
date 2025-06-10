import { getLoginToken } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/util/token";
// import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    // cookies() should be used in server components instead of API routes
    // const cookieStore = cookies();
    // const cookie = (await cookieStore).get("token");

    const token = await getLoginToken();
    if (!token) {
        return NextResponse.json({ message: "Please log in" }, { status: 401 })
    }

    try {
        const decoded = verifyToken(token);
        console.log("DECODED", decoded);
        if (!decoded) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 })
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, name: true, email: true } })
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
        console.log("USER: ", user);

        return NextResponse.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        return NextResponse.json({ message: "Unknown error occurred" }, { status: 401 });
    }
}