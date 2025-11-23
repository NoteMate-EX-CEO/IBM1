import { headers } from "next/headers";

export async function getCookieValue(name: string) {
  const h = await headers();
  const cookie = h.get("cookie") || "";
  const parts = cookie.split(/;\s*/);
  for (const p of parts) {
    const [k, ...rest] = p.split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}
