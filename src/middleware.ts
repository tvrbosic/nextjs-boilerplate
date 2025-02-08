// LIBRARY
import { NextResponse } from 'next/server';

// APP
import {
  isProtectedRoute,
  authenticatedUser,
} from '@/middlewares/authentication-middleware/authentication-middleware';

import {
  isRestrictedRoute,
  restrictToRoles,
} from '@/middlewares/authorization-middleware/authorization-middleware';

// TYPES
import { THttpMethod } from '@/types/network';

// ============================| CHAIN MIDDLEWARES HELPER |============================ //
async function stackMiddlewares(req: Request, middlewares: Function[]) {
  for (const middleware of middlewares) {
    const response = await middleware(req);

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
export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);

  // Define middleware stack
  const middlewares: Function[] = [];

  // Check if request pathname includes any of the defined protected routes
  if (isProtectedRoute(pathname, req.method as THttpMethod)) {
    middlewares.push(authenticatedUser);
  }

  // Check if request pathname includes any of the defined restricted routes
  if (isRestrictedRoute(pathname, req.method as THttpMethod)) {
    middlewares.push(restrictToRoles('ADMIN'));
  }

  // Run middlewares if any were added
  if (middlewares.length > 0) {
    return await stackMiddlewares(req, middlewares);
  }

  return NextResponse.next(); // No middleware applied
}
