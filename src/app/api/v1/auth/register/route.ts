// LIBRARY
import bcrypt from 'bcryptjs';

// APP
import withApiErrorHandler from '@/utility/api-error-handler/api-error-handler';
import { prisma } from '@/prisma/prisma';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@/utility/response/response';

export const POST = withApiErrorHandler(async (req: Request) => {
  const { email, password, firstName, lastName } = await req.json();

  // Validate input
  if (!email || !password || !firstName || !lastName) {
    return ApiBadRequestResponse({ message: 'All fields are required' });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return ApiBadRequestResponse({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, firstName, lastName },
  });

  return ApiCreatedResponse({
    message: 'User registered successfully',
    data: user,
  });
});
