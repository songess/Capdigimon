import { LogoutButton } from './LogoutButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface AuthStatusProps {
  isAuthenticated: boolean;
  username: string;
}

export function AuthStatus({ isAuthenticated, username }: AuthStatusProps) {
  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-bold">{username}님, 안녕하세요</span>
          <LogoutButton />
        </div>
      ) : (
        <>
          <Link href="/auth">
            <Button variant="outline" className="mr-2">
              로그인
            </Button>
          </Link>
          <Link href="/auth">
            <Button>회원가입</Button>
          </Link>
        </>
      )}
    </>
  );
}
