import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/db";
import { verifyPassword, createToken, TOKEN_COOKIE, COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const user = getUserByEmail(email);
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const token = await createToken({ sub: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}
