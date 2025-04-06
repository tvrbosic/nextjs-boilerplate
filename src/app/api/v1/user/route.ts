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
import { baseModelOmitFields, userOmitFields } from '@/prisma/utility';

// TYPES
import { IGetUserDTO } from '@/app/api/v1/user/types';

export const GET = withApiErrorWrapper(async (req: Request) => {
  const users: IGetUserDTO[] = await prisma.user.findMany({
    omit: {
      ...baseModelOmitFields(),
      ...userOmitFields(),
    },
  });
  return ApiSuccessResponse<IGetUserDTO[]>({
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

  return ApiCreatedResponse<IGetUserDTO>({
    message: 'User created successfully',
    data: newUser,
  });
});
