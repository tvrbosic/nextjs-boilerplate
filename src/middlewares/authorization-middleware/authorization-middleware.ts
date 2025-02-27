// APP
import { getSession } from '@/utility/session/session';
import { restrictedRoutes } from '@/middlewares/authorization-middleware/route-config';

// TYPES
import { THttpMethod } from '@/types/network';
import { Role } from '@prisma/client';
import { IIsRestrictedRouteResult } from '@/middlewares/authorization-middleware/types';
import {
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@/utility/response/response';

// ENV
const apiBaseUrl = process.env.APP_API_BASE_URL;
const logSecret = process.env.LOG_SECRET;

// ============================| HELPER FUNCTIONS |============================ //
export function isRestrictedRoute(
  requestPathname: string,
  requestMethod: THttpMethod
): IIsRestrictedRouteResult {
  let allowedRoles: Role[] = [];
  let isRestricted: boolean = false;

  restrictedRoutes.some((rr) => {
    /**
     * Convert a restricted route path with dynamic segments like `[some-guid]` into a regular expression that matches actual request paths.
     *
     * - Replace `[some-guid]` with `([^/]+)` which matches any single path segment.
     * - Regex is tailored to do exact matches and to prevent partial matches which gives more control.
     */
    const routeRegex = new RegExp(
      `^${rr.path.replace(/\[.*?\]/g, '([^/]+)')}$`
    );

    const isRestrictedRoute =
      routeRegex.test(requestPathname) && rr.methods.includes(requestMethod);

    if (isRestrictedRoute) {
      allowedRoles = rr.roles;
      isRestricted = true;
      return true;
    }

    return false;
  });

  return {
    isRestricted,
    allowedRoles,
  };
}

// ============================| AUTHORIZATION MIDDLEWARE |============================ //
export function restrictToRoles(roles: Role[]) {
  return async (req: Request) => {
    try {
      const decodedToken = await getSession();
      if (!decodedToken || !decodedToken.role) {
        return ApiUnauthorizedResponse();
      }

      if (!roles.includes(decodedToken.role as Role)) {
        return ApiForbiddenResponse();
      }

      // Continue if the role is allowed
      return null;
    } catch (error) {
      fetch(`${apiBaseUrl}/log-write`, {
        method: 'POST',
        body: JSON.stringify({
          level: 'error',
          message: '❗ AUTHORIZATION MIDDLEWARE ERROR ❗',
          secret: logSecret,
          error: error,
        }),
      });
    }
  };
}
