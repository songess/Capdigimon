import { cookies } from 'next/headers';

export async function getAuthStatus() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  const username = cookieStore.get('username')?.value;

  return {
    isAuthenticated: !!accessToken,
    username: username || '',
  };
}
