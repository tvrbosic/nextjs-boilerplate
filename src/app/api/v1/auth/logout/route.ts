// APP
import { ApiSuccessResponse } from '@/utility/response/response';
import { deleteSession } from '@/utility/session/session';

export async function POST() {
  await deleteSession();
  return ApiSuccessResponse({
    message: 'Logout successful',
  });
}
