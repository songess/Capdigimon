import { LogoutButton } from './LogoutButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface AuthStatusProps {
  isAuthenticated: boolean;
  username: string;
}

export function MobileAuthStatus({ isAuthenticated, username }: AuthStatusProps) {
  return (
    <div className="flex items-center px-4">
      {isAuthenticated ? (
        <div className="flex flex-col gap-2 w-full">
          <span className="text-gray-700">{username}님</span>
          <LogoutButton className="w-full" />
        </div>
      ) : (
        <>
          <Link href="/auth" className="w-full">
            <Button variant="outline" className="w-full mb-2">
              로그인
            </Button>
          </Link>
          <Link href="/auth" className="w-full">
            <Button className="w-full">회원가입</Button>
          </Link>
        </>
      )}
    </div>
  );
}
