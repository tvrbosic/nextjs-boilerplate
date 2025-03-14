// LIB
import { cookies } from 'next/headers';
import { JWTPayload } from 'jose';

// APP
import { generateToken, verifyToken } from '@/utility/jwt/jwt';

// TYPES
import { IUserJwtClaims } from '@/utility/jwt/types';
import { Role } from '@prisma/client';

// ENV
const JWT_COOKIE_EXPIRATION: number =
  parseInt(process.env.JWT_COOKIE_EXPIRATION!) || 15;

export async function createSession(
  userJwtClaims: IUserJwtClaims
): Promise<string> {
  const expiresAt = new Date(
    Date.now() + JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
  );
  const token = await generateToken(userJwtClaims);
  const cookieStore = await cookies();

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  // UNCOMMENT FOR TESTING: Get cookie to be able to test with Postman
  // console.log(cookieStore.get('session'));

  return token;
}

export async function getSession(): Promise<IUserJwtClaims | null> {
  // Retrieve the session cookie value
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  // Session does not exist
  if (!token) return null;

  // Verify
  const decoded = (await verifyToken(token)) as JWTPayload;

  // Ensure decoded payload matches IUserJwtClaims
  if (
    !decoded ||
    typeof decoded !== 'object' ||
    !decoded.userGuid ||
    !decoded.email ||
    !decoded.firstName ||
    !decoded.lastName ||
    !decoded.role
  ) {
    return null; // Return null if required properties are missing
  }

  // Cast and return the decoded token as IUserJwtClaims
  return {
    guid: decoded.userGuid as string,
    email: decoded.email as string,
    firstName: decoded.firstName as string,
    lastName: decoded.lastName as string,
    role: decoded.roles as Role,
    exp: decoded.exp,
    ...decoded, // Keep other fields if necessary
  } as IUserJwtClaims;
}

export async function updateSession() {
  // Retrieve the session cookie value
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  // Verify
  const decodedToken = await verifyToken(token);

  // If token is not valid or expired, delete session cookie
  if (!token || !decodedToken) {
    cookieStore.delete('session');
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
