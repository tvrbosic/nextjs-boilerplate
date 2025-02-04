// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { verifyToken } from '@/utility/jwt';

export function useProtectRoutes(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded || typeof decoded === 'string') {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 403 }
    );
  }

  // Attach user data to the request
  (req as any).user = decoded;

  return null; // No response means continue to next middleware
}
