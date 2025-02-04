import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';

const JWT_SECRET =
  process.env.JWT_SECRET || 'nextjs-boilerplate-project-jwt-secret-string';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15d';

export function generateToken(userGuid: string) {
  return jwt.sign({ userGuid }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as StringValue,
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
