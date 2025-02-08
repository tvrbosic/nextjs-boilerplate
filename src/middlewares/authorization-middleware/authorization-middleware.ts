// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { getSession } from '@/utility/session/session';

// TYPES
import { IRestrictedRouteConfig } from '@/middlewares/authorization-middleware/types';
import { THttpMethod } from '@/types/network';

// ============================| CONFGURATION |============================ //
/**
 * Configuration array for defining restricted routes (routes allowed only to users of specific role).
 * Array is used to check if a specific route and HTTP method combination should be allowed to user making request.
 */
const restrictedRoutes: IRestrictedRouteConfig[] = [
  {
    path: 'api/v1/user',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
];

// ============================| HELPER FUNCTIONS |============================ //
export function isRestrictedRoute(
  requestPathname: string,
  requestMethod: THttpMethod
): boolean {
  return restrictedRoutes.some(
    (rr) =>
      requestPathname.includes(rr.path) && rr.methods.includes(requestMethod)
  );
}

// ============================| AUTHORIZATION MIDDLEWARE |============================ //
export function restrictToRoles(...roles: string[]) {
  return async (req: Request) => {
    const decodedToken = await getSession();
    if (!decodedToken || !decodedToken.role) {
      return NextResponse.json(
        { error: 'Unauthorized: No user information found' },
        { status: 401 }
      );
    }

    if (!roles.includes(decodedToken.role as string)) {
      return NextResponse.json(
        { error: 'You do not have permission to perform this action' },
        { status: 403 }
      );
    }

    // Continue if the role is allowed
    return null;
  };
}
