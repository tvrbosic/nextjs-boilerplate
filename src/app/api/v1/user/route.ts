// LIBRARY
import bcrypt from 'bcryptjs';

// APP
import withApiErrorHandler from '@/utility/api-error-handler/api-error-handler';
import { prisma } from '@/prisma/prisma';
import {
  ApiSuccessResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@/utility/response/response';

export const GET = withApiErrorHandler(async (req: Request) => {
  const users = await prisma.user.findMany();
  return ApiSuccessResponse({
    message: 'Users fetched successfully',
    data: users,
  });
});

export const POST = withApiErrorHandler(async (req: Request) => {
  const body = await req.json();
  const { email, firstName, lastName, role, password } = body;

  if (!email) {
    return ApiBadRequestResponse({ message: 'Email is mandatory field' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || 'USER',
    },
  });

  return ApiCreatedResponse({
    message: 'User created successfully',
    data: newUser,
  });
});
