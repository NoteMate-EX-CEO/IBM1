import { NextResponse, type NextRequest } from "next/server";

const TOKEN_COOKIE = "cf_token";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get(TOKEN_COOKIE)?.value;

  // Allow unauthenticated access to auth pages
  const openPaths = new Set([
    "/login",
    "/signup",
    "/doctor/login",
    "/doctor/signup",
    "/onboarding",
  ]);

  if (openPaths.has(url.pathname)) {
    return NextResponse.next();
  }

  if (url.pathname.startsWith("/dashboard")) {
    if (!token) {
      url.pathname = "/login";
      url.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    // Optionally verify token signature here (expensive at edge). For hackathon, presence check is fine.
    return NextResponse.next();
  }
  if (url.pathname.startsWith("/doctor/")) {
    if (!token) {
      url.pathname = "/doctor/login";
      url.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/doctor/:path*"],
};
