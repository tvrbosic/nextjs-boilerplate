// LIBRARY
import { cookies } from 'next/headers';

// APP
import { generateToken, verifyToken } from '@/utility/jwt/jwt';

// TYPES
import { IUserJwtClaims } from '@/utility/jwt/types';
import { JWTPayload } from 'jose';

// ENV
const JWT_COOKE_EXPIRATION: number =
  parseInt(process.env.JWT_COOKE_EXPIRATION!) || 15;

export async function createSession(userJwtClaims: IUserJwtClaims) {
  const expiresAt = new Date(
    Date.now() + JWT_COOKE_EXPIRATION * 24 * 60 * 60 * 1000
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

  // TODO: Remove, for testing with Postman
  console.log(cookieStore.get('session'));
}

export async function getSession(): Promise<IUserJwtClaims | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value; // Retrieve the session cookie value

  if (!token) return null; // If session is not found, return null

  const decoded = (await verifyToken(token)) as JWTPayload;

  // Ensure decoded payload matches IUserJwtClaims
  if (
    !decoded ||
    typeof decoded !== 'object' ||
    !decoded.userGuid ||
    !decoded.role
  ) {
    return null; // Return null if required properties are missing
  }

  // Cast and return the token as IUserJwtClaims
  return {
    userGuid: decoded.userGuid as string,
    role: decoded.roles as string,
    ...decoded, // Keep other fields if necessary
  };
}

export async function updateSession() {
  const token = (await cookies()).get('session')?.value;
  const decodedToken = await verifyToken(token);

  if (!token || !decodedToken) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
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
