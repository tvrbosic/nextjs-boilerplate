// LIBRARY
import crypto from 'crypto';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper/api-error-wrapper';
import { forgotPasswordValidationSchema } from '@/app/api/v1/auth/validations';
import { prisma } from '@/prisma/prisma';
import {
  ApiSuccessResponse,
  ApiBadRequestResponse,
} from '@/utility/response/response';
import { sendEmail } from '@/utility/email/email';

export const POST = withApiErrorWrapper(async (req: Request) => {
  const body = await req.json();

  // Validate
  const validationResult = forgotPasswordValidationSchema.safeParse(body);
  if (!validationResult.success) {
    return ApiBadRequestResponse({
      message: validationResult.error.issues[0].message,
    });
  }

  // Extract data
  const { email } = validationResult.data;

  // Get user based on posted email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return ApiBadRequestResponse({ message: 'Invalid email provided' });
  }

  // Generate the random password reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash the token before storing it in the database.
  const hashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  /**
   * REASON FOR TOKEN HASHING:
   * - Storing plain-text reset tokens in the database is risky. If a database is compromised, attackers could use the tokens to reset passwords.
   * - Even if an attacker gets access to the hashed token, they can’t reverse it to obtain the original token.
   * - When a user submits a reset request, you hash their provided token and compare it with the stored hash in the database.
   */

  // Store the token and expiry in the database (assuming you have these fields)
  await prisma.user.update({
    where: { email },
    data: {
      passwordResetToken: hashedResetToken,
      passwordResetExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min expiration
    },
  });

  // Send password reset link to users email
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'http'; // Handles proxies
  const resetURL = `${protocol}://${host}/reset-password/${resetToken}`;

  const message = `Forgot your password? Visit following URL to reset your password: 
                  \n ${resetURL}
                  \n Provided password reset URL is valid for 10 minutes. 
                  \n If you did not forget your password, please ignore this email!`;

  await sendEmail({
    destinationEmail: user.email,
    subject: 'Your password reset URL (valid for 10 min)',
    text: message,
  });

  return ApiSuccessResponse({
    message: 'Password reset link has been sent to provided email.',
  });
});
