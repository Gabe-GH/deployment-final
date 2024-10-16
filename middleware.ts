// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for the session cookie
  const cookie = request.cookies.get("session");

  // If the session cookie is not present, redirect to the sign-in page
  if (!cookie) {
    // If the path is not '/signin', redirect
    if (
      request.nextUrl.pathname !== "/login" &&
      request.nextUrl.pathname !== "/register"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the user is authenticated, allow the request to proceed
  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: ["/"], // Specify which paths to protect
};
