// LIBRARY
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// APP
import { prisma } from '@/prisma/prisma';
import {
  ApiResponse,
  ApiErrorResponse,
  ApiInternalServerErrorResponse,
} from '@/utility/response/response';
import { sendEmail } from '@/utility/email/email';

export async function POST(req: Request) {
  try {
    // Get email from body
    const body = await req.json();
    const { email } = body;

    // 1) Get user based on posted email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return ApiErrorResponse({
        status: 400,
        message: 'Invalid email provided',
      });
    }

    // 2) Generate the random password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 3) Hash the token before storing it in the database.
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    /**
     * REASON FOR TOKEN HASHING:
     * - Storing plain-text reset tokens in the database is risky. If a database is compromised, attackers could use the tokens to reset passwords.
     * - Even if an attacker gets access to the hashed token, they can’t reverse it to obtain the original token.
     * - When a user submits a reset request, you hash their provided token and compare it with the stored hash in the database.
     */

    // 4) Store the token and expiry in the database (assuming you have these fields)
    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken,
        passwordResetExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min expiration
      },
    });

    // 5) Send password reset link to users email
    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'http'; // Handles proxies
    const resetURL = `${protocol}://${host}/api/v1/users/reset-password/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. \n If you did not forget your password, please ignore this email!`;

    await sendEmail({
      destinationEmail: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      text: message,
    });

    return ApiResponse({
      status: 200,
      message: 'Password reset link has been sent to provided email',
    });
  } catch (error: any) {
    console.error('Error processing forgot password request:', error);
    return ApiInternalServerErrorResponse();
  }
}
