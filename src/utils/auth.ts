import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getAuthStatus() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  const userInfoCookie = cookieStore.get('user_info');
  const username = userInfoCookie?.value ? decodeUserInfo(userInfoCookie.value).username : null;

  return {
    isAuthenticated: !!accessToken,
    username: username || '',
  };
}

export const decodeUserInfo = (token: string): { username: string } => {
  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY || 'your-secret-key') as {
      username: string;
    };
    return decoded;
  } catch (error) {
    console.error('토큰 디코딩 중 오류 발생:', error);
    throw new Error('유효하지 않은 토큰입니다.');
  }
};
