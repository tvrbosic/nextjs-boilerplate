// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { verifyToken } from '@/utility/jwt/jwt';

// TYPES
import {
  IProtectedRouteConfig,
  IRestrictedRouteConfig,
} from '@/middlewares/authMiddleware/types';
import { TAuthenticatedRequest, THttpMethod } from '@/types/network';

// ============================| CONFGURATION |============================ //
/**
 * Configuration array for defining protected routes (routes allowed only to authenticated users).
 * Array is used to check if a specific route and HTTP method combination should be allowed to user making request.
 */
const protectedRoutes: IProtectedRouteConfig[] = [
  {
    path: 'api/v1/user',
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },
];

/**
 * Configuration array for defining restricted routes (routes allowed only to users of specific role).
 * Array is used to check if a specific route and HTTP method combination should be allowed to user making request.
 */
const restrictedRoutes: IRestrictedRouteConfig[] = [
  {
    path: 'api/v1/user',
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },
];

// ============================| HELPER FUNCTIONS |============================ //
export function isProtectedRoute(
  requestPathname: string,
  requestMethod: THttpMethod
): boolean {
  return protectedRoutes.some(
    (pr) =>
      requestPathname.includes(pr.path) && pr.methods.includes(requestMethod)
  );
}

export function isRestrictedRoute(
  requestPathname: string,
  requestMethod: THttpMethod
): boolean {
  return restrictedRoutes.some(
    (rr) =>
      requestPathname.includes(rr.path) && rr.methods.includes(requestMethod)
  );
}

// ============================| AUTHENTICATION AND AUTHORIZATION MIDDLEWARES |============================ //
export async function authenticatedUser(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verifyToken(token);

    if (!decoded || typeof decoded === 'string') {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 403 }
      );
    }

    // Attach user data to the request
    (req as any).user = decoded;

    // Continue with the next middleware by returning null
    return null;
  } catch (error) {
    console.error('Error in token verification:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

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
