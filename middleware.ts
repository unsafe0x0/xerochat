import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Basic in-memory rate limiting (per Edge isolate)
// Limits to 50 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  const pathname = url.pathname;

  // --- Rate Limiting Logic ---
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth")) {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 50;

    const rateLimitData = rateLimitMap.get(ip);
    
    if (!rateLimitData || now > rateLimitData.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      if (rateLimitData.count >= maxRequests) {
        return NextResponse.json(
          { error: "Too many requests, please try again later." },
          { status: 429, headers: { "Retry-After": "60" } }
        );
      }
      rateLimitData.count++;
      rateLimitMap.set(ip, rateLimitData);
    }
  }
  // ---------------------------

  const isAuthPage = pathname.startsWith("/login");

  // Redirect authenticated users away from login page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to login page
  if (!token && !isAuthPage) {
    // For API routes, return 401 instead of redirecting
    if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Protect all routes except NextAuth API, static assets, and public files
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon\\.ico|.*\\.svg|.*\\.avif).*)",
  ],
};
