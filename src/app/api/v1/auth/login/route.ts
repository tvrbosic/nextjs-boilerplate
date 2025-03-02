// LIB
import bcrypt from 'bcryptjs';

// APP
import withApiErrorHandler from '@/utility/api-error-handler/api-error-handler';
import { prisma } from '@/prisma/prisma';
import { createSession } from '@/utility/session/session';
import {
  ApiSuccessResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@/utility/response/response';

// TYPES
import { User } from '@prisma/client';

export const POST = withApiErrorHandler(async (req: Request) => {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return ApiBadRequestResponse({
      message: 'Email and password are required!',
    });
  }

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return ApiUnauthorizedResponse({
      message: 'User with provided email was not found!',
    });
  }

  // Compare hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return ApiUnauthorizedResponse({
      message: 'Provided password is invalid!',
    });
  }

  // Create JWT token and user session
  const token = await createSession({
    userGuid: user.guid,
    role: user.role,
  });

  return ApiSuccessResponse<{ user: User }>({
    message: 'Login successful',
    data: { user },
  });
});
