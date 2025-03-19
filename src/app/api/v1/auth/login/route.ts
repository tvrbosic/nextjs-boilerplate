// LIB
import bcrypt from 'bcryptjs';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper/api-error-wrapper';
import { loginValidationSchema } from '@/app/api/v1/auth/login/validations';
import { prisma } from '@/prisma/prisma';
import { createSession } from '@/utility/session/session';
import {
  ApiSuccessResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@/utility/response/response';

export const POST = withApiErrorWrapper(async (req: Request) => {
  const bodyRaw = await req.json();

  // Validate
  const body = loginValidationSchema.safeParse(bodyRaw);
  if (!body.success) {
    return ApiBadRequestResponse({
      message: body.error.issues[0].message,
    });
  }

  // Extract data
  const { email, password } = body.data;

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
    guid: user.guid,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });

  return ApiSuccessResponse<{ token: string }>({
    message: 'Login successful',
    data: { token },
  });
});
