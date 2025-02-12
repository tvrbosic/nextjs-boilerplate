// LIBRARY
import { NextResponse } from 'next/server';

// APP
import { prisma } from '@/prisma/prisma';

// TYPES
import { IApiUserDeleteParams } from '@/app/api/v1/user/types';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<IApiUserDeleteParams> }
) {
  try {
    const guid = (await params).guid;

    if (!guid) {
      return NextResponse.json({ error: 'GUID is required' }, { status: 400 });
    }

    const deleteUser = await prisma.user.softDelete({
      guid,
    });

    return NextResponse.json({
      message: 'User deleted successfully',
      user: deleteUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
