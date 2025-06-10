import { cookies } from "next/headers"
const COOKIE_NAME = "token";

export const setLoginCookie = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    })
}

export const getLoginToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value || null;
}

export const clearLoginCookie = async () => {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "", { maxAge: 0, path: "/" })
}