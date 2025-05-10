import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Newspaper, Search, Settings } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-purple-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AI 기반 산업별 맞춤형 뉴스 브리핑 시스템
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              AI가 뉴스, 논문, 기술 블로그를 요약 및 정리하여 맞춤형 브리핑을 제공하는 시스템입니다.
              관심 있는 산업과 키워드를 설정하고, 최신 정보를 쉽게 받아보세요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/dashboard">
                <Button className="px-6 py-6 text-base">
                  대시보드 바로가기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/briefing-settings">
                <Button variant="outline" className="px-6 py-6 text-base">
                  브리핑 설정
                  <Settings className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">주요 기능</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              AI 기술로 최신 정보를 한눈에
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              최신 뉴스와 논문을 AI가 분석하여 핵심 정보만 제공합니다.
              관심 분야에 맞는 맞춤형 정보를 받아보세요.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Newspaper className="h-6 w-6 text-white" />
                  </div>
                  뉴스 요약
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  AI가 최신 뉴스를 자동으로 수집하고 요약하여 핵심 정보만 제공합니다.
                  시간을 절약하면서 중요한 정보를 놓치지 마세요.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  논문 검색
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  최신 연구 논문을 자동으로 검색하고 분석하여 연구 트렌드를 파악할 수 있습니다.
                  초록과 결론을 요약하여 빠르게 내용을 파악하세요.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  맞춤형 추천
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  사용자의 관심사와 선호도를 분석하여 개인 맞춤형 뉴스와 논문을 추천합니다.
                  이메일, 카카오톡 등으로 자동 알림을 받아보세요.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              지금 바로 시작하세요
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              회원가입 후 관심 키워드를 설정하고 맞춤형 뉴스 브리핑을 받아보세요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="px-6 py-6 text-base">
                무료로 시작하기
              </Button>
              <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                데모 보기 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
