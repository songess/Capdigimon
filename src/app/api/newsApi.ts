import {
  Category,
  TrendData,
  AdminStats,
  NewsPaperResponse,
  LoginResponse,
  AlarmResponse,
  dayOfMonthEnum,
  dayOfWeekEnum,
  receiveTimeEnum,
  frequencyEnum,
  CategoryStats,
  KeywordSearchResponse,
  CrawlingHistory,
  RecommendContentResponse,
  SchedulerState,
} from '@/types/type';
import { ApiError } from '@/lib/errors';

// 뉴스 데이터 가져오기
export async function fetchNews(access_token: string): Promise<NewsPaperResponse[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/dashboard/me/user-categories?type=news`, {
    credentials: 'include',
    headers: {
      Cookie: `access_token=${access_token}`,
    },
  });
  // const data = await response.json();
  // return data.articles.map(mapToNewsFormat);
  return response.json();
}

// 모든 뉴스 데이터 가져오기
export async function fetchAllNews(): Promise<NewsPaperResponse[]> {
  // 실제 프로덕션에서는 실제 API를 사용해야 합니다
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/dashboard/?type=news`, {
    credentials: 'include',
  });
  // const data = await response.json();
  // return data.articles.map(mapToNewsFormat);
  return response.json();
}

// 논문 데이터 가져오기
export async function fetchPapers(access_token: string): Promise<NewsPaperResponse[]> {
  // 실제 프로덕션에서는 실제 API를 사용해야 합니다
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/dashboard/me/user-categories?type=paper`,
    {
      credentials: 'include',
      headers: {
        Cookie: `access_token=${access_token}`,
      },
    },
  );
  return response.json();
}

// 모든 논문 데이터 가져오기
export async function fetchAllPapers(): Promise<NewsPaperResponse[]> {
  // 실제 프로덕션에서는 실제 API를 사용해야 합니다
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/dashboard/?type=paper`, {
    credentials: 'include',
  });
  return response.json();
}

// 카테고리 목록 가져오기
export async function fetchCategories(): Promise<Category[]> {
  return mockCategories;
}

export async function fetchSelectedCategories(): Promise<string[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/categories/me/categories`, {
    credentials: 'include',
  });
  return response.json();
}

export async function fetchCategoryToggle(subCategoryId: string): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/categories/me/categories/toggle?category_name=${subCategoryId}`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );
  return response.json();
}

// 키워드 트렌드 데이터 가져오기
export async function fetchTrends(): Promise<TrendData[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/stat/trend-data`, {
    credentials: 'include',
  });
  return response.json();
}

// 관리자 통계 데이터 가져오기
export async function fetchAdminStats(): Promise<AdminStats> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/stat/total-stats`, {
    credentials: 'include',
  });
  return response.json();
}

// 크롤링 히스토리 데이터 가져오기
export async function fetchCrawlingHistory(type: string): Promise<CrawlingHistory[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/stat/crawl-log-${type}`, {
    credentials: 'include',
  });
  return response.json();
}

export async function fetchCategoryStats(): Promise<CategoryStats[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/stat/category-stats`, {
    credentials: 'include',
  });
  return response.json();
}

export async function fetchSignUp(email: string, password: string, name: string): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password, full_name: name }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new ApiError('회원가입 실패', response.status);
  }
  return response.json();
}

export async function fetchLogin(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/login/access-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ username: email, password: password }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new ApiError('로그인 실패', response.status);
  }
  return response.json();
}

// 알람 설정 정보 가져오기
export async function fetchMyAlarm(): Promise<AlarmResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/alarms/me`, {
    credentials: 'include',
  });
  return response.json();
}

// 이메일 알람 ON/OFF 토글
export async function patchAlarmEmailOn(): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/alarms/me/email_on`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return response.json();
}

//뉴스테러 이메일 변경
export async function patchChangeEmail(email: string): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/alarms/me/email?email=${email}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return response.json();
}

// 카카오 알람 ON/OFF 토글
export async function patchAlarmKakaoOn(): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/alarms/me/kakao_on`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return response.json();
}

// 알람 빈도 설정
export async function patchAlarmFrequency(frequency: frequencyEnum): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/alarms/me/frequency?frequency=${frequency}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  return response.json();
}

// 월별 알람 날짜 설정
export async function patchAlarmDayOfMonth(dayOfMonth: dayOfMonthEnum): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/alarms/me/day_of_month?day_of_month=${dayOfMonth}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  return response.json();
}

// 주별 알람 요일 설정
export async function patchAlarmDayOfWeek(dayOfWeek: dayOfWeekEnum): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/alarms/me/day_of_week?day_of_week=${dayOfWeek}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  return response.json();
}

// 알람 수신 시간 설정
export async function patchAlarmReceiveTime(receiveTime: receiveTimeEnum): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/alarms/me/receive_time?receive_time=${receiveTime}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );
  return response.json();
}

// 뉴스하이라이트 가져오기
export async function fetchNewsHighlight(categoryGroupName: string): Promise<NewsPaperResponse[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/stat/top-k-hits/group/${categoryGroupName}?k=1`,
    {
      credentials: 'include',
    },
  );
  return response.json();
}

// 뉴스 조회수 증가
export async function incrementNewsViewCount(id: number): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/newspapers/${id}/increment_hits`, {
    method: 'PATCH',
    credentials: 'include',
  });
  return response.json();
}

// 키워드 탐색
export async function fetchKeywordSearch(keyword: string): Promise<KeywordSearchResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AI_DOMAIN}/api/direct_api/keyword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: keyword }),
    credentials: 'include',
  });
  return response.json();
}

// 관련 뉴스/논문 추천 기사
export async function fetchRelatedNews(id: number, type: string): Promise<{ results: RecommendContentResponse[] }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AI_DOMAIN}/api/direct_api/recommend-content/${id}/${type}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response.json();
}

// 스케쥴러 상태 가져오기
export async function fetchSchedulerState(): Promise<SchedulerState> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/sched/status`, {
    credentials: 'include',
  });
  return response.json();
}

// 수동 크롤링
export async function fetchManualCrawling({ type }: { type: string }): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/sched/update-contents?type=${type}`, {
    method: 'POST',
    credentials: 'include',
  });
  return response.json();
}

const mockCategories: Category[] = [
  {
    id: 'COMPUTER_ENGINEERING',
    name: '컴퓨터 공학',
    subcategories: [
      { id: 'COMPUTER_ARCHITECTURE', name: '컴퓨터 아키텍처' },
      { id: 'EMBEDDED_SYSTEMS', name: '임베디드 시스템' },
      { id: 'VLSI_DESIGN', name: 'VLSI 설계' },
      { id: 'OPERATING_SYSTEMS', name: '운영체제' },
      { id: 'COMPUTER_NETWORKS', name: '컴퓨터 네트워크' },
      { id: 'SOFTWARE_ENGINEERING', name: '소프트웨어 공학' },
      { id: 'ARTIFICIAL_INTELLIGENCE_ROBOTICS', name: '인공지능/로보틱스' },
      { id: 'DATA_SCIENCE_ANALYTICS', name: '데이터 사이언스' },
      { id: 'SECURITY_RELIABILITY', name: '정보보안' },
    ],
  },
  {
    id: 'ELECTRICAL_ELECTRONIC_ENGINEERING',
    name: '전기/전자 공학',
    subcategories: [
      { id: 'POWER_SYSTEMS', name: '전력 시스템' },
      { id: 'ELECTRONICS_ENGINEERING', name: '전자공학' },
      { id: 'COMMUNICATION_SYSTEMS', name: '통신 시스템' },
      { id: 'CONTROL_SYSTEMS', name: '제어 시스템' },
      { id: 'SIGNAL_PROCESSING', name: '신호 처리' },
      { id: 'MICROELECTRONICS_NANOTECHNOLOGY', name: '마이크로일렉트로닉스/나노기술' },
      { id: 'ELECTROMAGNETICS_MICROWAVES', name: '전자기학/마이크로파' },
      { id: 'INSTRUMENTATION_SENSING', name: '계측/센싱' },
      { id: 'OPTICS_PHOTONICS', name: '광학/포토닉스' },
    ],
  },
  {
    id: 'IT_CATEGORY',
    name: 'IT 기업',
    subcategories: [
      { id: 'QUALCOMM', name: '퀄컴' },
      { id: 'MEDIATEK', name: '미디어텍' },
      { id: 'APPLE', name: '애플' },
      { id: 'XIAOMI', name: '샤오미' },
      { id: 'VIVO', name: '비보' },
      { id: 'OPPO', name: 'OPPO' },
      { id: 'HUAWEI', name: '화웨이' },
      // { id: 'SNAPDRAGON', name: '스냅드래곤' },
      // { id: 'DIMENSITY', name: '디멘시티' },
      // { id: 'KIRIN', name: '키린' },
    ],
  },
];

export function subCategoriesEngToKor(engId: string): string {
  for (const category of mockCategories) {
    const subcategory = category.subcategories?.find((sub) => sub.id === engId);
    if (subcategory) {
      return subcategory.name;
    }
  }
  return '알 수 없는 카테고리';
}

// const mockAdminStats: AdminStats = {
//   totalUsers: 1250,
//   activeUsers: 850,
//   totalNews: 5280,
//   totalPapers: 1830,
//   crawlingStatus: {
//     lastRun: '2025-04-03T08:30:00',
//     nextRun: '2025-04-03T08:30:00',
//     success: true,
//     totalNumber: 128,
//   },
// };
