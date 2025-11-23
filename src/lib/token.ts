import { jwtVerify } from "jose";

export const TOKEN_COOKIE = "cf_token";

export async function verifyJwt(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload as any;
}
