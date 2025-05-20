import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  // 인증이 필요한 페이지 목록
  const protectedRoutes = ['/briefing-settings', '/admin'];

  // 현재 경로가 보호된 경로인지 확인
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // 보호된 경로에 접근하려고 하는데 토큰이 없는 경우
  if (isProtectedRoute && !accessToken) {
    const url = new URL('/auth', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: ['/briefing-settings/:path*', '/admin/:path*'],
};
