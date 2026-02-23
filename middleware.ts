import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define protected routes and their allowed roles
  const protectedRoutes = {
    "/student": ["student"],
    "/faculty": ["faculty"],
    "/hod": ["hod"],
    "/principal": ["principal"],
  }

  // Check if the current path is a protected route
  const isProtectedRoute = Object.keys(protectedRoutes).some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Get user data from localStorage (this would typically be from a secure cookie)
    // For demo purposes, we'll let the client-side RouteGuard handle the protection
    // In production, you'd validate the JWT token here

    // Allow the request to proceed - client-side RouteGuard will handle the actual protection
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
