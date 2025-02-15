// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { prisma } from '@/prisma/prisma';
import {
  ApiResponse,
  ApiErrorResponse,
  ApiInternalServerErrorResponse,
} from '@/utility/response/response';

// TYPES
import { IApiUserDeleteParams } from '@/app/api/v1/user/types';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<IApiUserDeleteParams> }
) {
  try {
    const guid = (await params).guid;

    if (!guid) {
      return ApiErrorResponse({ status: 400, message: 'GUID is required' });
    }

    const deleteUser = await prisma.user.softDelete({
      guid,
    });

    return ApiResponse({ status: 204, message: 'User deleted successfully' });
  } catch (error: any) {
    return ApiInternalServerErrorResponse();
  }
}
