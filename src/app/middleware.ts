// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { useProtectRoutes } from '@/middlewares/authMiddleware';

// Middleware execution helper
function applyMiddlewares(req: Request, middlewares: Function[]) {
  for (const middleware of middlewares) {
    const response = middleware(req);

    // Stop if a middleware returns a response
    if (response) return response;
  }
  // Continue if no middleware blocks the request
  return NextResponse.next();
}

// ============================| MIDDLEWARES CONFIGURATION |============================ //
export function middleware(req: Request) {
  console.log('🔹 Middleware is running for:', req.url);
  const { pathname } = new URL(req.url);
  console.log('🔹 Pathname extracted:', pathname);

  // Convert pathname to segments
  const segments = pathname.split('/').filter(Boolean); // Remove empty segments

  // Check if any segment is "protected"
  const isProtected = segments.includes('protected');
  console.log(segments);

  // -------------------< Middleware Rules >--------------------
  if (isProtected) {
    return applyMiddlewares(req, [useProtectRoutes]);
  }

  // Add more rules and middlewares (examples)
  // if (pathname.startsWith("/api/v1/admin")) {
  //   return applyMiddlewares(req, [useProtectRoutes]); // Only Authentication for admin
  // }

  // if (pathname.startsWith("/api/v1/public")) {
  //   return applyMiddlewares(req, [loggingMiddleware]); // Only Logging for public
  // }

  return NextResponse.next(); // No middleware applied
}

// ============================| MIDDLEWARE MATCHER |============================ //
// Trigger middleware on all API routes (which middleware will be applied is decided with middleware rules)
export const config = {
  matcher: ['/api/v1/:path*'],
};
