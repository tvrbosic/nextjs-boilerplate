// LIBRARY
import { cookies } from 'next/headers';

// APP
import { deleteSession } from '@/utility/session/session';

export async function logout() {
  deleteSession();
  // TODO: redirect('/login')
}
