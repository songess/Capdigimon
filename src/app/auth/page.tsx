'use client';

import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchLogin, fetchSignUp } from '../api/newsApi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await fetchLogin(email, password);

        toast.success('로그인되었습니다.');
      } else {
        await fetchSignUp(email, password, name);
        toast.success('회원가입이 완료되었습니다.');
      }
      localStorage.setItem('username', '송은수');
      router.push('/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{isLogin ? '로그인' : '회원가입'}</h1>
          <p className="mt-2 text-lg text-gray-600">{isLogin ? '계정에 로그인하세요' : '새로운 계정을 만드세요'}</p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex justify-center">
            <Tabs
              defaultValue="login"
              className="w-full"
              onValueChange={(value) => {
                setIsLogin(value === 'login');
              }}
            >
              <TabsList className="grid w-full grid-cols-2 gap-1 bg-white ">
                <TabsTrigger
                  value="login"
                  className="text-lg data-[state=active]:border-gray-200 data-[state=active]:bg-gray-50 transition-colors"
                >
                  로그인
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="text-lg data-[state=active]:border-gray-200 data-[state=active]:bg-gray-50 transition-colors"
                >
                  회원가입
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-medium text-gray-700">
                      이메일
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => handleInputChange(e, setEmail)}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 text-lg bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-lg font-medium text-gray-700">
                      비밀번호
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => handleInputChange(e, setPassword)}
                      required
                      autoComplete="current-password"
                      className="w-full px-4 py-3 text-lg bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button type="submit" className="w-full py-3 text-lg cursor-pointer">
                    로그인
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg font-medium text-gray-700">
                      이름
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => handleInputChange(e, setName)}
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 text-lg bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="홍길동"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-lg font-medium text-gray-700">
                      이메일
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={email}
                      onChange={(e) => handleInputChange(e, setEmail)}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 text-lg bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-lg font-medium text-gray-700">
                      비밀번호
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => handleInputChange(e, setPassword)}
                      required
                      autoComplete="new-password"
                      className="w-full px-4 py-3 text-lg bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button type="submit" className="w-full py-3 text-lg cursor-pointer">
                    회원가입
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 text-lg">또는</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Button
                variant="outline"
                className="w-full py-3 text-lg bg-[#FEE500] hover:bg-[#FEE500]/90 text-black border-none cursor-pointer"
                onClick={() =>
                  (window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/kakao/login`)
                }
              >
                카카오로 로그인
              </Button>
              <Button
                variant="outline"
                className="w-full py-3 text-lg bg-gray-100 hover:bg-gray-300 text-black border-none cursor-pointer"
                onClick={() =>
                  (window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/google/login`)
                }
              >
                구글로 로그인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
