// APP
import { ApiResponse } from '@/utility/response/response';
import { deleteSession } from '@/utility/session/session';

export async function POST() {
  deleteSession();
  // TODO: redirect('/login')
  return ApiResponse({
    status: 200,
    message: 'Logout successful',
  });
}
