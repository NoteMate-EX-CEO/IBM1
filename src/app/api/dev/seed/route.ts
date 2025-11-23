import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Disabled in production" }, { status: 403 });
  }
  const users = [
    { name: 'Dr. Jane Doe', email: 'jane.doe@hospital.org', password: 'Test@12345', role: 'DOCTOR' },
    { name: 'Dr. Alex Kim', email: 'alex.kim@hospital.org', password: 'Test@12345', role: 'DOCTOR' },
    { name: 'Dr. Omar Ali', email: 'omar.ali@hospital.org', password: 'Test@12345', role: 'DOCTOR' },
    { name: 'Admin User', email: 'admin@hospital.org', password: 'Admin@12345', role: 'ADMIN' },
  ] as const;

  const results: any[] = [];
  for (const u of users) {
    const existing = getUserByEmail(u.email);
    if (existing) {
      results.push({ id: existing.id, email: existing.email, role: existing.role });
      continue;
    }
    const passwordHash = await bcrypt.hash(u.password, 12);
    const created = createUser({ name: u.name, email: u.email, passwordHash, role: u.role as any });
    results.push({ id: created.id, email: created.email, role: created.role });
  }
  return NextResponse.json({ ok: true, users: results });
}
