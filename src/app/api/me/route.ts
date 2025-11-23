import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const token = (await cookies()).get("cf_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const secret = process.env.JWT_SECRET;
  if (!secret) return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.json({
      id: payload.sub,
      email: (payload as any).email,
      name: (payload as any).name,
      role: (payload as any).role,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
