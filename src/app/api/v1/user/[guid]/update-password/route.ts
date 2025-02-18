// LIBRARY
import bcrypt from 'bcryptjs';

// APP
import { prisma } from '@/prisma/prisma';
import {
  ApiResponse,
  ApiErrorResponse,
  ApiInternalServerErrorResponse,
} from '@/utility/response/response';

// TYPES
import { IPatchUserParams } from '@/app/api/v1/user/types';

export async function PATCH(req: Request, { params }: IPatchUserParams) {
  try {
    // Get guid from query params
    const guid = (await params).guid;

    // Get password from body
    const body = await req.json();
    const { password } = await req.json();

    if (!guid) {
      return ApiErrorResponse({ status: 400, message: 'GUID is required' });
    }

    // 1) Get user from collection
    const user = await prisma.user.findUnique({
      where: {
        guid,
      },
    });

    if (!user) {
      return ApiErrorResponse({
        status: 400,
        message: 'Invalid GUID provided',
      });
    }

    // 2) Check if posted password is correct
    const passwordsMatch = await bcrypt.compare(password, user!.password);
    if (!passwordsMatch) {
      return ApiErrorResponse({
        status: 401,
        message: 'Incorrect password provided',
      });
    }

    // 3) Hash and update the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        guid,
      },
      data: {
        password: hashedPassword,
      },
    });

    return ApiResponse({
      status: 200,
      message: 'User password updated successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    console.error('Error updating user password:', error);
    return ApiInternalServerErrorResponse();
  }
}
