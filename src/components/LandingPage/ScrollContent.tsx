import { Newspaper, Search, Settings } from 'lucide-react';

export interface ScrollContentItem {
  type: string;
  title: string;
  subtitle: string;
  isDoubleBtn: boolean;
  btn1?: { text: string; href: string };
  btn2?: { text: string; href: string };
  btn3?: { text: string; href: string };
  btnText?: string;
  btnClickLink?: string;
  hoverColor?: string;
  body: React.ReactNode;
}

export const SCROLL_CONTENT_LIST: ScrollContentItem[] = [
  {
    type: 'hero',
    title: 'AI 기반 산업별 맞춤형 뉴스 브리핑 시스템',
    subtitle:
      'AI가 뉴스, 논문, 기술 블로그를 요약 및 정리하여 맞춤형 브리핑을 제공하는 시스템입니다. 관심 있는 산업과 키워드를 설정하고, 최신 정보를 쉽게 받아보세요.',
    isDoubleBtn: true,
    btn1: { text: '대시보드 바로가기', href: '/dashboard' },
    btn2: { text: '브리핑 설정', href: '/briefing-settings' },
    body: null,
  },
  {
    type: 'features',
    title: 'AI 기술로 최신 정보를 한눈에',
    subtitle: '최신 뉴스와 논문을 AI가 분석하여 핵심 정보만 제공합니다. 관심 분야에 맞는 맞춤형 정보를 받아보세요.',
    isDoubleBtn: false,
    body: (
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
              AI가 최신 뉴스를 자동으로 수집하고 요약하여 핵심 정보만 제공합니다. 시간을 절약하면서 중요한 정보를 놓치지
              마세요.
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
              최신 연구 논문을 자동으로 검색하고 분석하여 연구 트렌드를 파악할 수 있습니다. 초록과 결론을 요약하여
              빠르게 내용을 파악하세요.
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
              사용자의 관심사와 선호도를 분석하여 개인 맞춤형 뉴스와 논문을 추천합니다. 이메일, 카카오톡 등으로 자동
              알림을 받아보세요.
            </dd>
          </div>
        </dl>
      </div>
    ),
  },
  {
    type: 'cta',
    title: '지금 바로 시작하세요',
    subtitle: '회원가입 후 관심 키워드를 설정하고 맞춤형 뉴스 브리핑을 받아보세요.',
    isDoubleBtn: true,
    btn1: { text: '무료로 시작하기', href: '/auth' },
    btn2: { text: '대시보드 바로가기', href: '/dashboard' },
    body: null,
  },
];
