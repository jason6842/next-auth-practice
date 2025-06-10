import { setLoginCookie } from "@/lib/auth/session";
import { verifyUser } from "@/service/userService";
import { signToken } from "@/util/token";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing Fields." }, { status: 400 });
        }

        const user = await verifyUser(email, password)
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        // create JWT 
        const token = signToken({ userId: user.userId, name: user.name });

        await setLoginCookie(token);
        return NextResponse.json({ success: true, user })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 })
        }
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}