// LIBRARY
import bcrypt from 'bcryptjs';

// APP
import withApiErrorHandler from '@/utility/api-error-handler/api-error-handler';
import { prisma } from '@/prisma/prisma';
import {
  ApiSuccessResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@/utility/response/response';

// TYPES
import { IPatchUserParams } from '@/app/api/v1/user/types';

export const PATCH = withApiErrorHandler(
  async (req: Request, { params }: IPatchUserParams) => {
    // Get guid from query params
    const guid = (await params).guid;

    // Get password from body
    const body = await req.json();
    const { newPassword, oldPassword } = body;

    if (!guid) {
      return ApiBadRequestResponse({ message: 'GUID is required' });
    }

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
