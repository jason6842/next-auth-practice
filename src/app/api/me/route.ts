import { verifyToken } from "@/util/token";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // cookies() should be used in server components instead of API routes
    // const cookieStore = cookies();
    // const cookie = (await cookieStore).get("token");

    const token = request.cookies.get("token")?.value
    if (!token) {
        return NextResponse.json({ message: "Please log in" }, { status: 401 })
    }

    try {
        const decoded = verifyToken(token);
        console.log(decoded);
        return NextResponse.json({ name: decoded.name })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 401 });
        }
        return NextResponse.json({ message: "Unknown error occurred" }, { status: 401 });
    }
}