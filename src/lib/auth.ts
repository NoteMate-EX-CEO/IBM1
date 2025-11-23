import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

export const TOKEN_COOKIE = "cf_token";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function hashPassword(plain: string) {
  const saltRounds = 12;
  return bcrypt.hash(plain, saltRounds);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export async function createToken(payload: Record<string, unknown>) {
  const secret = getSecret();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE}s`)
    .sign(secret);
}

export async function verifyToken(token: string) {
  const secret = getSecret();
  const { payload } = await jwtVerify(token, secret);
  return payload as any;
}
