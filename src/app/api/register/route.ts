import { addUser } from "@/service/userService";

export async function POST(request: Request) {
    // Parse the request body
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return Response.json({ message: "Missing required fields." },
            { status: 400 }
        )
    }

    // Insert users to mock array
    addUser({ name, email, password });

    return Response.json({ message: "User registered." },
        { status: 201 });
};