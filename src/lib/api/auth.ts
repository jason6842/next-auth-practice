type RegisterUserRequest = {
    name: string,
    email: string,
    password: string,
}

export async function registerUser(formData: RegisterUserRequest) {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })

    const data = await res.json();

    if (!res.ok) {
        return { success: false, message: data.message }
    }

    return { success: true }
}

type LoginUserRequest = {
    email: string,
    password: string,
}

export async function loginUser(user: LoginUserRequest) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

    if (!res.ok) {
        throw new Error("Login Failed");
    }
}

export async function fetchUser(): Promise<{ name: string }> {
    const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Unable to fetch user data.");
    }

    return res.json();
}

export async function logoutUser() {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
    })

    if (!res.ok) {
        throw new Error("Failed to log out");
    }

    return res.json();

}