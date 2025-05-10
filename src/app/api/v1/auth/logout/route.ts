// APP
import { ApiSuccessResponse } from '@/utility/response/response';
import { deleteSession } from '@/utility/session';

export async function POST() {
  await deleteSession();
  return ApiSuccessResponse({
    message: 'Logout successful',
  });
}
