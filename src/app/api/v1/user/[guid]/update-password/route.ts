// LIBRARY
import bcrypt from 'bcryptjs';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper';
import { updatePasswordValidationSchema } from '@/app/api/v1/user/validations';
import { prisma } from '@/prisma/prisma';
import {
  ApiSuccessResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@/utility/response/response';
import { getSession } from '@/utility/session';
import { baseModelOmitFields, userOmitFields } from '@/prisma/utility';

// TYPES
import { IGetUserDTO, IPatchUserParams } from '@/app/api/v1/user/types';

export const PATCH = withApiErrorWrapper(
  async (req: Request, { params }: IPatchUserParams) => {
    const guid = (await params).guid;
    const body = await req.json();

    const activeUser = await getSession();

    if (activeUser!.guid !== guid) {
      return ApiBadRequestResponse({
        message: 'You can only update your own profile',
      });
    }

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

    const updatedUser: IGetUserDTO = await prisma.user.update({
      omit: {
        ...baseModelOmitFields(),
        ...userOmitFields(),
      },
      where: {
        guid,
      },
      data: {
        password: hashedPassword,
      },
    });

    return ApiSuccessResponse<IGetUserDTO>({
      message: 'User password updated successfully',
      data: updatedUser,
    });
  }
);
