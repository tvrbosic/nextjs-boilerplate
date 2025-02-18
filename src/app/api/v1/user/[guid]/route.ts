// APP
import { prisma } from '@/prisma/prisma';
import {
  ApiResponse,
  ApiErrorResponse,
  ApiInternalServerErrorResponse,
} from '@/utility/response/response';

// TYPES
import {
  IDeleteUserParams,
  IGetUserParams,
  IPutUserParams,
} from '@/app/api/v1/user/types';

export async function GET(req: Request, { params }: IGetUserParams) {
  try {
    const guid = (await params).guid;

    if (!guid) {
      return ApiErrorResponse({ status: 400, message: 'GUID is required' });
    }

    const user = await prisma.user.findUnique({
      where: {
        guid,
      },
    });

    return ApiResponse({
      status: 200,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return ApiInternalServerErrorResponse();
  }
}

export async function PUT(req: Request, { params }: IPutUserParams) {
  try {
    const guid = (await params).guid;

    if (!guid) {
      return ApiErrorResponse({ status: 400, message: 'GUID is required' });
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

    return ApiResponse({
      status: 200,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return ApiInternalServerErrorResponse();
  }
}

export async function DELETE(req: Request, { params }: IDeleteUserParams) {
  try {
    const guid = (await params).guid;

    if (!guid) {
      return ApiErrorResponse({ status: 400, message: 'GUID is required' });
    }

    const deleteUser = await prisma.user.softDelete({
      guid,
    });

    return ApiResponse({
      status: 200,
      message: 'User deleted successfully',
      data: deleteUser,
    });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return ApiInternalServerErrorResponse();
  }
}
