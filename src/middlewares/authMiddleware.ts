// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { verifyToken } from '@/utility/jwt';

export const protectedRoutes = ['api/v1/user'];

export function authenticatedUser(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  // Use promise chaining instead of await
  return verifyToken(token)
    .then((decoded) => {
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
    })
    .catch((error) => {
      console.error('Error in token verification:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    });
}
