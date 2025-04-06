// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper/api-error-wrapper';
import { getSession } from '@/utility/session/session';
import {
  putUserValidationSchema,
  patchUserValidationSchema,
  deleteUserValidationSchema,
} from '@/app/api/v1/user/validations';
import { prisma } from '@/prisma/prisma';
import {
  ApiSuccessResponse,
  ApiBadRequestResponse,
} from '@/utility/response/response';
import { baseModelOmitFields, userOmitFields } from '@/prisma/utility';

// TYPES
import {
  IGetUserParams,
  IPatchUserParams,
  IUpdateUserParams,
  IDeleteUserParams,
  IGetUserDTO,
} from '@/app/api/v1/user/types';

export const GET = withApiErrorWrapper(
  async (req: Request, { params }: IGetUserParams) => {
    const guid = (await params).guid;

    if (!guid) {
      return ApiBadRequestResponse({ message: 'GUID is required' });
    }

    const user: IGetUserDTO | null = await prisma.user.findUnique({
      omit: {
        ...baseModelOmitFields(),
        ...userOmitFields(),
      },
      where: {
        guid,
      },
    });

    if (!user) {
      return ApiBadRequestResponse({ message: 'User not found' });
    }

    return ApiSuccessResponse<IGetUserDTO>({
      message: 'User fetched successfully',
      data: user,
    });
  }
);

// NOTE: PATCH does not update password and role (safe to be called by non admin users). Password is updated using a different API.
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
    const validationResult = patchUserValidationSchema.safeParse({
      guid,
      ...body,
    });
    if (!validationResult.success) {
      return ApiBadRequestResponse({
        message: validationResult.error.issues[0].message,
      });
    }

    const updatedUser: IGetUserDTO = await prisma.user.update({
      omit: {
        ...baseModelOmitFields(),
        ...userOmitFields(),
      },
      where: {
        guid,
      },
      data: {
        ...validationResult.data,
      },
    });

    return ApiSuccessResponse<IGetUserDTO>({
      message: 'User updated successfully',
      data: updatedUser,
    });
  }
);

// NOTE: PUT does not update password but can update role (only admins should use this API). Password is updated using a different API.
export const PUT = withApiErrorWrapper(
  async (req: Request, { params }: IUpdateUserParams) => {
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

    const updatedUser: IGetUserDTO = await prisma.user.update({
      omit: {
        ...baseModelOmitFields(),
        ...userOmitFields(),
      },
      where: {
        guid,
      },
      data: {
        ...validationResult.data,
      },
    });

    return ApiSuccessResponse<IGetUserDTO>({
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
