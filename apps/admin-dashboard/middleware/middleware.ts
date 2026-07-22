// ============================================================
// Admin Dashboard — Next.js Middleware
// Handles authentication-based route protection.
// Full implementation comes in the Auth phase.
// ============================================================

import { type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // TODO: Implement Supabase session validation and redirect logic
  // - Redirect unauthenticated users from (dashboard) routes to /login
  // - Redirect authenticated users from /login to /dashboard
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
