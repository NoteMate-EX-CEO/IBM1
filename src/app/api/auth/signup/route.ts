import { NextResponse } from "next/server";
import { getUserByEmail, createUser } from "@/lib/db";
import { hashPassword, createToken, TOKEN_COOKIE, COOKIE_MAX_AGE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    const passwordHash = await hashPassword(password);
    const normalizedRole = role === 'DOCTOR' ? 'DOCTOR' : 'ADMIN';
    const user = createUser({ name, email, passwordHash, role: normalizedRole as any });
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
