// LIBRARY
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper/api-error-wrapper';
import { prisma } from '@/prisma/prisma';
import {
  ApiSuccessResponse,
  ApiBadRequestResponse,
} from '@/utility/response/response';
import { deleteSession } from '@/utility/session/session';

// TYPES
import { IPatchResetPasswordParams } from '@/app/api/v1/auth/types';

export const PATCH = withApiErrorWrapper(
  async (req: Request, { params }: IPatchResetPasswordParams) => {
    const resetToken = (await params).token;

    // Get new password from body
    const body = await req.json();
    const { newPassword, newPasswordConfirm } = body;

    // Return bad request if provided passwords do not match
    if (newPassword !== newPasswordConfirm) {
      return ApiBadRequestResponse({
        message: 'Provided passwords do not match',
      });
    }

    // Hash provided reset token (because one stored in database is also hashed for security reasons)
    const hashedResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Get user based on the provided hashed reset token and token expiry date
    const user = await prisma.user.findUnique({
      where: {
        passwordResetToken: hashedResetToken,
        passwordResetExpiresAt: {
          gt: new Date(),
        },
      },
    });

    // Return bad request if token has expired or if there is no user
    if (!user) {
      return ApiBadRequestResponse({
        message: 'Invalid or expired token provided',
      });
    }

    // Update user password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { guid: user.guid },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiresAt: null,
      },
    });

    // Log out user
    deleteSession();

    return ApiSuccessResponse({
      message: 'Password has been successfully updated, please log in again',
    });
  }
);
