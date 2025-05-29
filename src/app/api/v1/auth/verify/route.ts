// LIBRARY
import { cookies } from 'next/headers';

// APP
import withApiErrorWrapper from '@/utility/api-error-wrapper';
import { verifyToken } from '@/utility/jwt/jwt';
import { ApiSuccessResponse } from '@/utility/response/response';

export const GET = withApiErrorWrapper(async (req: Request) => {
  // Retrieve the session cookie value
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  // Verify
  const decodedToken = await verifyToken(token);

  // If token is not valid or expired, delete session cookie
  if (!token || !decodedToken) {
    cookieStore.delete('session');
    return ApiSuccessResponse({
      message: 'Session expired!',
    });
  }

  return ApiSuccessResponse<{ token: string }>({
    message: 'Verification successful',
    data: { token },
  });
});
