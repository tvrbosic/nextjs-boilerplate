// APP
import { getSession, updateSession } from '@/utility/session';
import { protectedRoutes } from '@/middlewares/authentication-middleware/route-config';
import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@/utility/response/response';

// TYPES
import { THttpMethod } from '@/types/network';

// ENV
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const logSecret = process.env.LOG_SECRET;

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
      return ApiUnauthorizedResponse();
    }

    if (!decodedToken || typeof decodedToken === 'string') {
      return ApiUnauthorizedResponse();
    }

    // Refresh user session on every successfully authenticated request
    await updateSession();

    // Continue with the next middleware by returning null
    return null;
  } catch (error) {
    fetch(`${apiBaseUrl}/log-write`, {
      method: 'POST',
      body: JSON.stringify({
        level: 'error',
        message: '❗ AUTHENTICATION MIDDLEWARE ERROR ❗',
        secret: logSecret,
        error: error,
      }),
    });

    return ApiInternalServerErrorResponse();
  }
}
