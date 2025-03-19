// LIBRARY
import bcrypt from 'bcryptjs';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper/api-error-wrapper';
import { postUserValidationSchema } from '@/app/api/v1/user/validations';
import { prisma } from '@/prisma/prisma';
import {
  ApiSuccessResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@/utility/response/response';

export const GET = withApiErrorWrapper(async (req: Request) => {
  const users = await prisma.user.findMany();
  return ApiSuccessResponse({
    message: 'Users fetched successfully',
    data: users,
  });
});

export const POST = withApiErrorWrapper(async (req: Request) => {
  const body = await req.json();

  // Validate
  const validationResult = postUserValidationSchema.safeParse(body);
  if (!validationResult.success) {
    return ApiBadRequestResponse({
      message: validationResult.error.issues[0].message,
    });
  }

  // Extract data
  const { email, password, firstName, lastName, role } = validationResult.data;

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
