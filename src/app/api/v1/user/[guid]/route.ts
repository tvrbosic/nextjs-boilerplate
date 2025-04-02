// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper/api-error-wrapper';
import {
  putUserValidationSchema,
  deleteUserValidationSchema,
} from '@/app/api/v1/user/validations';
import { prisma } from '@/prisma/prisma';
import {
  ApiSuccessResponse,
  ApiBadRequestResponse,
} from '@/utility/response/response';

// TYPES
import {
  IDeleteUserParams,
  IGetUserParams,
  IPutUserParams,
} from '@/app/api/v1/user/types';

export const GET = withApiErrorWrapper(
  async (req: Request, { params }: IGetUserParams) => {
    const guid = (await params).guid;

    if (!guid) {
      return ApiBadRequestResponse({ message: 'GUID is required' });
    }

    const user = await prisma.user.findUnique({
      where: {
        guid,
      },
    });

    return ApiSuccessResponse({
      message: 'User fetched successfully',
      data: user,
    });
  }
);

export const PUT = withApiErrorWrapper(
  async (req: Request, { params }: IPutUserParams) => {
    const guid = (await params).guid;
    const body = await req.json();

    // Validate
    const validationResult = putUserValidationSchema.safeParse({
      guid,
      ...body,
    });
    if (!validationResult.success) {
      return ApiBadRequestResponse({
        message: validationResult.error.issues[0].message,
      });
    }

    // NOTE: Password will be stripped from validation object. Password is updated on different endpoint.
    const updatedUser = await prisma.user.update({
      where: {
        guid,
      },
      data: {
        ...validationResult.data,
      },
    });

    return ApiSuccessResponse({
      message: 'User updated successfully',
      data: updatedUser,
    });
  }
);

export const DELETE = withApiErrorWrapper(
  async (req: Request, { params }: IDeleteUserParams) => {
    const guid = (await params).guid;

    // Validate
    const validationResult = deleteUserValidationSchema.safeParse({ guid });
    if (!validationResult.success) {
      return ApiBadRequestResponse({
        message: validationResult.error.issues[0].message,
      });
    }

    const deleteUser = await prisma.user.softDelete({
      guid,
    });

    return ApiSuccessResponse({
      message: 'User deleted successfully',
      data: deleteUser,
    });
  }
);
