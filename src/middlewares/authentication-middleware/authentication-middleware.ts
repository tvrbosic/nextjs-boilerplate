// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { verifyToken } from '@/utility/jwt/jwt';

// TYPES
import { IProtectedRouteConfig } from '@/middlewares/authentication-middleware/types';
import { THttpMethod } from '@/types/network';

// ============================| CONFGURATION |============================ //
/**
 * Configuration array for defining protected routes (routes allowed only to authenticated users).
 * Array is used to check if a specific route and HTTP method combination should be allowed to user making request.
 */
const protectedRoutes: IProtectedRouteConfig[] = [
  {
    path: 'api/v1/user',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
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

// ============================| AUTHENTICATION MIDDLEWARE |============================ //
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
