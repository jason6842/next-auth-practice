import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/signup"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token && !PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/posts/:path*", "/profile/:path*"]
}