import { Category, TrendData, AdminStats, NewsPaperResponse } from '@/types/type';

// 뉴스 데이터 가져오기
export async function fetchNews(): Promise<NewsPaperResponse[]> {
  // 실제 프로덕션에서는 실제 API를 사용해야 합니다
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/dashboard/me/user-categories?type=news`, {
    credentials: 'include',
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
export async function fetchPapers(): Promise<NewsPaperResponse[]> {
  // 실제 프로덕션에서는 실제 API를 사용해야 합니다
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/dashboard/?type=paper`);
  return response.json();
}

// 모든 논문 데이터 가져오기
export async function fetchAllPapers(): Promise<NewsPaperResponse[]> {
  // 실제 프로덕션에서는 실제 API를 사용해야 합니다
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/dashboard/?type=paper`);
  return response.json();
}

// 카테고리 목록 가져오기
export async function fetchCategories(): Promise<Category[]> {
  return mockCategories;
}

// 키워드 트렌드 데이터 가져오기
export async function fetchTrends(): Promise<TrendData[]> {
  return mockTrends;
}

// 관리자 통계 데이터 가져오기
export async function fetchAdminStats(): Promise<AdminStats> {
  return mockAdminStats;
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
    throw new Error('회원가입 실패');
  }
  return response.json();
}

export async function fetchLogin(email: string, password: string): Promise<Response> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/login/access-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ username: email, password: password }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('로그인 실패');
  }
  return response.json();
}
// 목업 데이터
// const mockNews: NewsPaper[] = [
//   {
//     summary: '최근 인공지능 기술의 발전과 산업 적용 사례를 분석하고 미래 전망을 제시합니다.',
//     title: '인공지능 기술의 최신 동향과 미래 전망',
//     date: '2025-04-01',
//     source: 'Tech Daily',
//     contents:
//       '인공지능 기술은 최근 몇 년간 급속도로 발전하여 다양한 산업 분야에 적용되고 있습니다. 특히 자연어 처리와 컴퓨터 비전 분야에서 큰 발전이 있었으며, 이는 다양한 응용 프로그램의 개발로 이어지고 있습니다. 향후 인공지능 기술은 더욱 발전하여 의료, 금융, 제조 등 다양한 산업 분야에서 혁신을 이끌 것으로 전망됩니다.',
//     author: 'Tech Daily',
//     link: 'https://example.com/ai-trends',
//     type: 'news',
//   },
//   {
//     summary: '블록체인 기술이 금융 서비스 산업에 미치는 영향과 혁신 사례를 소개합니다.',
//     title: '블록체인 기술을 활용한 금융 서비스 혁신',
//     date: '2025-03-28',
//     source: 'Finance Today',
//     contents:
//       '블록체인 기술은 금융 서비스 산업에 큰 변화를 가져오고 있습니다. 분산 원장 기술을 활용한 새로운 금융 서비스가 등장하고 있으며, 이는 기존 금융 시스템의 효율성과 투명성을 높이는 데 기여하고 있습니다. 특히 디지털 자산과 스마트 계약을 활용한 서비스가 주목받고 있으며, 이는 금융 산업의 미래를 변화시킬 것으로 예상됩니다.',
//     author: 'Finance Today',
//     link: 'https://example.com/blockchain-finance',
//     type: 'news',
//   },
//   {
//     summary: '5G 기술의 상용화 현황과 다양한 산업에 미치는 영향을 분석합니다.',
//     title: '5G 기술의 상용화와 산업 영향',
//     date: '2025-03-25',
//     source: 'Tech Review',
//     contents:
//       '5G 기술의 상용화가 본격화되면서 다양한 산업에 큰 영향을 미치고 있습니다. 고속, 저지연, 대용량 연결이라는 5G의 특성은 자율주행차, 스마트 팩토리, 원격 의료 등 다양한 분야에서 혁신을 가능하게 하고 있습니다. 특히 실시간 데이터 처리가 중요한 응용 분야에서 5G 기술의 활용이 두드러지고 있습니다.',
//     author: 'Tech Review',
//     link: 'https://example.com/5g-impact',
//     type: 'news',
//   },
//   {
//     summary: '친환경 에너지 기술의 최신 동향과 미래 전망을 소개합니다.',
//     title: '친환경 에너지 기술의 발전과 미래',
//     date: '2025-03-20',
//     source: 'Energy Journal',
//     contents:
//       '친환경 에너지 기술은 기후 변화 대응과 지속 가능한 발전을 위해 중요성이 커지고 있습니다. 태양광, 풍력, 수소 에너지 등 다양한 재생 에너지 기술이 발전하고 있으며, 에너지 저장 기술의 발전도 함께 이루어지고 있습니다. 이러한 기술의 발전은 친환경 에너지의 경제성을 높이고, 화석 연료에 대한 의존도를 낮추는 데 기여할 것으로 전망됩니다.',
//     author: 'Energy Journal',
//     link: 'https://example.com/green-energy',
//     type: 'news',
//   },
//   {
//     summary: '최신 바이오 기술의 발전과 의료 산업에 미치는 영향을 분석합니다.',
//     title: '바이오 기술의 혁신과 의료 산업의 변화',
//     date: '2025-03-15',
//     source: 'Medical Science',
//     contents:
//       '바이오 기술의 혁신은 의료 산업에 큰 변화를 가져오고 있습니다. 유전자 편집, 정밀 의학, 바이오 인포매틱스 등 다양한 기술의 발전은 질병 진단과 치료 방법을 혁신적으로 변화시키고 있습니다. 특히 개인 맞춤형 의료 서비스의 발전은 의료의 효과성과 효율성을 크게 향상시킬 것으로 전망됩니다.',
//     author: 'Medical Science',
//     link: 'https://example.com/biotech-medical',
//     type: 'news',
//   },
// ];

// const mockPapers: NewsPaper[] = [
//   {
//     summary: '본 논문에서는 딥러닝을 활용한 자연어 처리 기술의 최신 동향을 분석하고, 향후 발전 방향을 제시합니다.',
//     title: '딥러닝을 활용한 자연어 처리 기술의 최신 동향',
//     date: '2025-03-15',
//     source: 'AI Research Journal',
//     contents:
//       '본 논문에서는 딥러닝을 활용한 자연어 처리 기술의 최신 동향을 분석하고, 향후 발전 방향을 제시합니다. 특히 트랜스포머 모델과 대규모 언어 모델의 발전에 초점을 맞추어 설명합니다.',
//     author: '김철수, 이영희, 박지민',
//     link: 'https://example.com/paper/nlp-deep-learning',
//     type: 'paper',
//   },
//   {
//     summary: '본 논문에서는 다양한 블록체인 합의 알고리즘의 보안성을 분석하고, 각 알고리즘의 장단점을 비교합니다.',
//     title: '블록체인 기반 합의 알고리즘의 보안성 분석',
//     date: '2025-03-05',
//     source: 'Security Research Journal',
//     contents:
//       '본 논문에서는 다양한 블록체인 합의 알고리즘의 보안성을 분석하고, 각 알고리즘의 장단점을 비교합니다. 특히 작업 증명, 지분 증명, 권한 증명 방식의 보안 취약점과 대응 방안에 초점을 맞추어 설명합니다.',
//     author: '홍길동, 정민수, 최영희',
//     link: 'https://example.com/paper/blockchain-consensus',
//     type: 'paper',
//   },
//   {
//     summary:
//       '본 논문에서는 양자 컴퓨팅 기술의 발전에 따른 기존 암호화 기술의 취약점을 분석하고, 이에 대응하기 위한 방안을 제시합니다.',
//     title: '양자 컴퓨팅을 활용한 암호화 기술의 취약점 분석',
//     date: '2025-02-28',
//     source: 'Quantum Computing Journal',
//     contents:
//       '본 논문에서는 양자 컴퓨팅 기술의 발전에 따른 기존 암호화 기술의 취약점을 분석하고, 이에 대응하기 위한 방안을 제시합니다. 특히 RSA와 ECC 알고리즘의 취약점에 초점을 맞추어 설명합니다.',
//     author: '이태영, 김민지, 박성호',
//     link: 'https://example.com/paper/quantum-crypto',
//     type: 'paper',
//   },
//   {
//     summary: '본 논문에서는 인공지능을 활용한 의료 영상 분석 기술의 최신 동향을 분석하고, 임상 적용 사례를 소개합니다.',
//     title: '인공지능을 활용한 의료 영상 분석 기술',
//     date: '2025-02-20',
//     source: 'Medical AI Journal',
//     contents:
//       '본 논문에서는 인공지능을 활용한 의료 영상 분석 기술의 최신 동향을 분석하고, 임상 적용 사례를 소개합니다. 특히 딥러닝 모델을 활용한 의료 영상 분석의 정확성과 효율성에 초점을 맞추어 설명합니다.',
//     author: '정수진, 김영수, 이미라',
//     link: 'https://example.com/paper/ai-medical-imaging',
//     type: 'paper',
//   },
//   {
//     summary: '본 논문에서는 스마트 시티 구현을 위한 IoT 기술의 활용 방안을 제시하고, 실제 적용 사례를 분석합니다.',
//     title: '스마트 시티 구현을 위한 IoT 기술의 활용 방안',
//     date: '2025-02-15',
//     source: 'IoT Research Journal',
//     contents:
//       '본 논문에서는 스마트 시티 구현을 위한 IoT 기술의 활용 방안을 제시하고, 실제 적용 사례를 분석합니다. 특히 도시 인프라와 IoT 기술의 연계를 통한 효율성 향상에 초점을 맞추어 설명합니다.',
//     author: '박준호, 김민수, 이지연',
//     link: 'https://example.com/paper/iot-smart-city',
//     type: 'paper',
//   },
// ];

const mockCategories: Category[] = [
  {
    id: '1',
    name: '기술',
    description: '최신 기술 동향 및 혁신',
    subcategories: [
      { id: '1-1', name: '인공지능', description: '인공지능 기술 및 응용' },
      { id: '1-2', name: 'ML', description: '머신러닝 기술 및 응용' },
      { id: '1-3', name: '개발', description: '소프트웨어 개발 및 프로그래밍' },
      { id: '1-4', name: '클라우드', description: '클라우드 컴퓨팅 및 서비스' },
    ],
  },
  {
    id: '2',
    name: '금융',
    description: '금융 시장 및 서비스 동향',
    subcategories: [
      { id: '2-1', name: '핀테크', description: '금융 기술 혁신' },
      { id: '2-2', name: '투자', description: '투자 및 자산 관리' },
      { id: '2-3', name: '은행', description: '은행 및 금융 서비스' },
    ],
  },
  {
    id: '3',
    name: '통신',
    description: '통신 기술 및 서비스 동향',
    subcategories: [
      { id: '3-1', name: '5G', description: '5G 기술 및 서비스' },
      { id: '3-2', name: '네트워크', description: '네트워크 인프라 및 기술' },
    ],
  },
  {
    id: '4',
    name: '에너지',
    description: '에너지 산업 및 기술 동향',
    subcategories: [
      { id: '4-1', name: '신재생', description: '신재생 에너지 기술' },
      { id: '4-2', name: '전기차', description: '전기차 및 배터리 기술' },
    ],
  },
  {
    id: '5',
    name: '의료',
    description: '의료 기술 및 서비스 동향',
    subcategories: [
      { id: '5-1', name: '디지털헬스', description: '디지털 헬스케어 기술' },
      { id: '5-2', name: '바이오', description: '바이오 기술 및 연구' },
    ],
  },
];

const mockTrends: TrendData[] = [
  { date: '2025-01', keyword: '인공지능', count: 120 },
  { date: '2025-01', keyword: '블록체인', count: 80 },
  { date: '2025-01', keyword: '5G', count: 60 },
  { date: '2025-02', keyword: '인공지능', count: 150 },
  { date: '2025-02', keyword: '블록체인', count: 90 },
  { date: '2025-02', keyword: '5G', count: 70 },
  { date: '2025-03', keyword: '인공지능', count: 200 },
  { date: '2025-03', keyword: '블록체인', count: 110 },
  { date: '2025-03', keyword: '5G', count: 85 },
  { date: '2025-04', keyword: '인공지능', count: 250 },
  { date: '2025-04', keyword: '블록체인', count: 130 },
  { date: '2025-04', keyword: '5G', count: 100 },
];

const mockAdminStats: AdminStats = {
  totalUsers: 1250,
  activeUsers: 850,
  totalNews: 5280,
  totalPapers: 1830,
  crawlingStatus: {
    lastRun: '2025-04-03T08:30:00',
    success: true,
    itemsProcessed: 128,
  },
};
