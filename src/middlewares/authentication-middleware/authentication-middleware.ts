// APP
import { getSession, updateSession } from '@/utility/session/session';
import { protectedRoutes } from '@/middlewares/authentication-middleware/route-config';
import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@/utility/response/response';

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
    console.error('❗❗❗ AUTHENTICATION MIDDLEWARE ERROR ❗❗❗');
    console.error('Error details: ');
    console.error(error);

    return ApiInternalServerErrorResponse();
  }
}
