'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/logout`, {
        credentials: 'include',
      });

      // 쿠키 제거
      setCookie('access_token', '', { expires: new Date(0), path: '/' });
      setCookie('username', '', { expires: new Date(0), path: '/' });

      // 홈페이지로 리다이렉트 및 상태 새로고침
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout} className={className}>
      로그아웃
    </Button>
  );
}
