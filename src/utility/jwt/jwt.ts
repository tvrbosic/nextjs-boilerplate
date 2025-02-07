// LIBRARY
import { SignJWT, jwtVerify } from 'jose';

// TYPES
import { IUserJwtClaims } from '@/utility/jwt/types';

const JWT_SECRET =
  process.env.JWT_SECRET || 'nextjs-boilerplate-project-jwt-secret-string';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15d';

const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function generateToken(userJwtClaims: IUserJwtClaims) {
  return new SignJWT({ ...userJwtClaims })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secretKey);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('JWT verification error: ', error);
    return null;
  }
}
