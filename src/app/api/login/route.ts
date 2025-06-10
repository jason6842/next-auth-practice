import { signToken } from "@/util/token";
import { NextResponse } from "next/server";

const hardcodedUser = {
    userId: "123",
    name: "test",
    email: "test@example.com",
    password: "test123",
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (email !== hardcodedUser.email || password !== hardcodedUser.password) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        // create JWT 
        const token = signToken({ userId: hardcodedUser.userId, name: hardcodedUser.name });

        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 })
        }
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}