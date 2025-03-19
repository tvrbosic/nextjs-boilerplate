// LIBRARY
import bcrypt from 'bcryptjs';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper/api-error-wrapper';
import { updatePasswordValidationSchema } from '@/app/api/v1/user/validations';
import { prisma } from '@/prisma/prisma';
import {
  ApiSuccessResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@/utility/response/response';

// TYPES
import { IPatchUserParams } from '@/app/api/v1/user/types';

export const PATCH = withApiErrorWrapper(
  async (req: Request, { params }: IPatchUserParams) => {
    const guid = (await params).guid;
    const body = await req.json();

    // Validate
    const validationResult = updatePasswordValidationSchema.safeParse({
      guid,
      ...body,
    });
    if (!validationResult.success) {
      return ApiBadRequestResponse({
        message: validationResult.error.issues[0].message,
      });
    }

    // Extract data
    const { newPassword, oldPassword } = validationResult.data;

    // Get user from collection
    const user = await prisma.user.findUnique({
      where: {
        guid,
      },
    });

    if (!user) {
      return ApiBadRequestResponse({ message: 'Invalid GUID provided' });
    }

    // Check if posted oldPassword is correct
    const passwordsMatch = await bcrypt.compare(oldPassword, user!.password);
    if (!passwordsMatch) {
      return ApiUnauthorizedResponse({
        message: 'Incorrect password provided',
      });
    }

    // Hash and update the newPssword
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: {
        guid,
      },
      data: {
        password: hashedPassword,
      },
    });

    return ApiSuccessResponse({
      message: 'User password updated successfully',
      data: updatedUser,
    });
  }
);
