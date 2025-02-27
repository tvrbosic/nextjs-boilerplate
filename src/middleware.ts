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
import { logRequest } from '@/middlewares/log-request-middleware/log-request-middleware';

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
  const { isRestricted, allowedRoles } = isRestrictedRoute(
    pathname,
    req.method as THttpMethod
  );
  if (isRestricted) {
    middlewares.push(restrictToRoles(allowedRoles));
  }

  // Log triggered route except write log API route (see route implementation for more info)
  if (pathname !== '/api/v1/log-write') {
    middlewares.push(logRequest);
  }

  // Run middlewares if any were added
  if (middlewares.length > 0) {
    return await stackMiddlewares(req, middlewares);
  }

  return NextResponse.next(); // No middleware applied
}
