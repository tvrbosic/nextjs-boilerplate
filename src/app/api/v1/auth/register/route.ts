// LIBRARY
import bcrypt from 'bcryptjs';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper/api-error-wrapper';
import { registerValidationSchema } from '@/app/api/v1/auth/register/validations';
import { prisma } from '@/prisma/prisma';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@/utility/response/response';

export const POST = withApiErrorWrapper(async (req: Request) => {
  const body = await req.json();

  // Validate
  const validationResult = registerValidationSchema.safeParse(body);
  if (!validationResult.success) {
    return ApiBadRequestResponse({
      message: validationResult.error.issues[0].message,
    });
  }

  // Extract data
  const { email, password, firstName, lastName } = validationResult.data;

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
