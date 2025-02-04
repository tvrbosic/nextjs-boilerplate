// LIBRARY
import { NextResponse } from 'next/server';

// APP
import {
  authenticatedUser,
  protectedRoutes,
} from '@/middlewares/authMiddleware';

// ============================| MIDDLEWARE CHAIN HELPER |============================ //
function stackMiddlewares(req: Request, middlewares: Function[]) {
  for (const middleware of middlewares) {
    const response = middleware(req);

    // Stop if a middleware returns a response
    if (response) return response;
  }
  // Continue if no middleware blocks the request
  return NextResponse.next();
}

// ============================| MIDDLEWARE MATCHER |============================ //
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

// ============================| MIDDLEWARES CONFIGURATION |============================ //
export function middleware(req: Request) {
  const { pathname } = new URL(req.url);

  // Check if pathname includes any of defined protected routes
  const isProtected = protectedRoutes.some((pr) => pathname.includes(pr));

  // -------------------< Middleware Rules >--------------------
  if (isProtected) {
    return stackMiddlewares(req, [authenticatedUser]);
  }

  // Extend middleware (for different routes and with different middleware stack)
  // if (pathname.startsWith("/api/v1/admin")) {
  //   return stackMiddlewares(req, [middlewareA, middlewareB]);
  // }

  return NextResponse.next(); // No middleware applied
}
