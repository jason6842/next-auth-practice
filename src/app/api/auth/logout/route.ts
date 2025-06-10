import { clearLoginCookie } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST() {
    await clearLoginCookie()
    return NextResponse.json({ success: true })
}