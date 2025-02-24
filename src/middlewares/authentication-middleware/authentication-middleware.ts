// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { getSession, updateSession } from '@/utility/session/session';
import { protectedRoutes } from '@/middlewares/authentication-middleware/route-config';

// TYPES
import { THttpMethod } from '@/types/network';

// ============================| HELPER FUNCTIONS |============================ //
export function isProtectedRoute(
  requestPathname: string,
  requestMethod: THttpMethod
): boolean {
  return protectedRoutes.some((pr) => {
    /**
     * Convert a protected route path with dynamic segments like `[some-guid]` into a regular expression that matches actual request paths.
     *
     * - Replace `[some-guid]` with `([^/]+)` which matches any single path segment.
     * - Regex is tailored to do exact matches and to prevent partial matches which gives more control.
     */
    const routeRegex = new RegExp(
      `^${pr.path.replace(/\[.*?\]/g, '([^/]+)')}$`
    );

    return (
      routeRegex.test(requestPathname) && pr.methods.includes(requestMethod)
    );
  });
}

// ============================| AUTHENTICATION MIDDLEWARE |============================ //
export async function authenticatedUser(req: Request) {
  try {
    const decodedToken = await getSession();

    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!decodedToken || typeof decodedToken === 'string') {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 403 }
      );
    }

    // Refresh user session on every successfully authenticated request
    await updateSession();

    // Continue with the next middleware by returning null
    return null;
  } catch (error) {
    console.error('Error in token verification:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
