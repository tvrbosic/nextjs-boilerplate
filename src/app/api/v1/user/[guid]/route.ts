// APP
import withApiErrorHandler from '@/utility/api-error-handler/api-error-handler';
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

export const GET = withApiErrorHandler(
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

export const PUT = withApiErrorHandler(
  async (req: Request, { params }: IPutUserParams) => {
    const guid = (await params).guid;

    if (!guid) {
      return ApiBadRequestResponse({ message: 'GUID is required' });
    }

    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        guid,
      },
      data: {
        ...body,
      },
    });

    return ApiSuccessResponse({
      message: 'User updated successfully',
      data: updatedUser,
    });
  }
);

export const DELETE = withApiErrorHandler(
  async (req: Request, { params }: IDeleteUserParams) => {
    const guid = (await params).guid;

    if (!guid) {
      return ApiBadRequestResponse({ message: 'GUID is required' });
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
