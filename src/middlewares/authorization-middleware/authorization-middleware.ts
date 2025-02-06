// LIBRARY
import { NextResponse } from 'next/server';

// TYPES
import { IRestrictedRouteConfig } from '@/middlewares/authorization-middleware/types';
import { TAuthenticatedRequest, THttpMethod } from '@/types/network';

// ============================| CONFGURATION |============================ //
/**
 * Configuration array for defining restricted routes (routes allowed only to users of specific role).
 * Array is used to check if a specific route and HTTP method combination should be allowed to user making request.
 */
const restrictedRoutes: IRestrictedRouteConfig[] = [
  {
    path: 'api/v1/user',
    methods: ['GET', 'PUT', 'PATCH', 'DELETE'],
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
  return (req: TAuthenticatedRequest) => {
    if (!req.user || !req.user.role) {
      return NextResponse.json(
        { error: 'Unauthorized: No user information found' },
        { status: 401 }
      );
    }

    if (!roles.includes(req.user.role)) {
      return NextResponse.json(
        { error: 'You do not have permission to perform this action' },
        { status: 403 }
      );
    }

    // Continue if the role is allowed
    return null;
  };
}
