import { createUser, findUserByEmail } from "@/service/userService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // Parse the request body
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return Response.json({ message: "Missing required fields." },
            { status: 400 }
        )
    }

    const existing = await findUserByEmail(email);
    if (existing) {
        return NextResponse.json({ error: "Email already in use." }, { status: 400 })
    }

    const user = await createUser(name, email, password);
    return NextResponse.json(user);
};