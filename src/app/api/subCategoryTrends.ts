import { TrendData } from '@/types/type';

// 서브 카테고리 트렌드 데이터
export const subCategoryTrends: TrendData[] = [
  // 기술 서브 카테고리 트렌드
  { date: '2025-01', keyword: '인공지능', count: 120 },
  { date: '2025-01', keyword: 'ML', count: 90 },
  { date: '2025-01', keyword: '개발', count: 70 },
  { date: '2025-01', keyword: '클라우드', count: 60 },
  
  { date: '2025-02', keyword: '인공지능', count: 150 },
  { date: '2025-02', keyword: 'ML', count: 110 },
  { date: '2025-02', keyword: '개발', count: 85 },
  { date: '2025-02', keyword: '클라우드', count: 75 },
  
  { date: '2025-03', keyword: '인공지능', count: 200 },
  { date: '2025-03', keyword: 'ML', count: 140 },
  { date: '2025-03', keyword: '개발', count: 100 },
  { date: '2025-03', keyword: '클라우드', count: 95 },
  
  { date: '2025-04', keyword: '인공지능', count: 250 },
  { date: '2025-04', keyword: 'ML', count: 180 },
  { date: '2025-04', keyword: '개발', count: 120 },
  { date: '2025-04', keyword: '클라우드', count: 110 },
  
  // 금융 서브 카테고리 트렌드
  { date: '2025-01', keyword: '핀테크', count: 65 },
  { date: '2025-01', keyword: '투자', count: 80 },
  { date: '2025-01', keyword: '은행', count: 55 },
  
  { date: '2025-02', keyword: '핀테크', count: 75 },
  { date: '2025-02', keyword: '투자', count: 95 },
  { date: '2025-02', keyword: '은행', count: 60 },
  
  { date: '2025-03', keyword: '핀테크', count: 90 },
  { date: '2025-03', keyword: '투자', count: 115 },
  { date: '2025-03', keyword: '은행', count: 70 },
  
  { date: '2025-04', keyword: '핀테크', count: 110 },
  { date: '2025-04', keyword: '투자', count: 130 },
  { date: '2025-04', keyword: '은행', count: 85 },
  
  // 통신 서브 카테고리 트렌드
  { date: '2025-01', keyword: '5G', count: 60 },
  { date: '2025-01', keyword: '네트워크', count: 50 },
  
  { date: '2025-02', keyword: '5G', count: 70 },
  { date: '2025-02', keyword: '네트워크', count: 65 },
  
  { date: '2025-03', keyword: '5G', count: 85 },
  { date: '2025-03', keyword: '네트워크', count: 75 },
  
  { date: '2025-04', keyword: '5G', count: 100 },
  { date: '2025-04', keyword: '네트워크', count: 90 },
  
  // 에너지 서브 카테고리 트렌드
  { date: '2025-01', keyword: '신재생', count: 45 },
  { date: '2025-01', keyword: '전기차', count: 55 },
  
  { date: '2025-02', keyword: '신재생', count: 60 },
  { date: '2025-02', keyword: '전기차', count: 70 },
  
  { date: '2025-03', keyword: '신재생', count: 80 },
  { date: '2025-03', keyword: '전기차', count: 95 },
  
  { date: '2025-04', keyword: '신재생', count: 95 },
  { date: '2025-04', keyword: '전기차', count: 120 },
  
  // 의료 서브 카테고리 트렌드
  { date: '2025-01', keyword: '디지털헬스', count: 40 },
  { date: '2025-01', keyword: '바이오', count: 65 },
  
  { date: '2025-02', keyword: '디지털헬스', count: 55 },
  { date: '2025-02', keyword: '바이오', count: 80 },
  
  { date: '2025-03', keyword: '디지털헬스', count: 75 },
  { date: '2025-03', keyword: '바이오', count: 100 },
  
  { date: '2025-04', keyword: '디지털헬스', count: 90 },
  { date: '2025-04', keyword: '바이오', count: 125 },
];

// 서브 카테고리 트렌드 데이터 가져오기
export function fetchSubCategoryTrends(): Promise<TrendData[]> {
  return Promise.resolve(subCategoryTrends);
}

// 특정 카테고리의 서브 카테고리 트렌드 데이터 가져오기
export function fetchSubCategoryTrendsByCategory(categoryName: string): Promise<TrendData[]> {
  // 카테고리별 서브 카테고리 매핑
  const subCategoryMapping: { [key: string]: string[] } = {
    '기술': ['인공지능', 'ML', '개발', '클라우드'],
    '금융': ['핀테크', '투자', '은행'],
    '통신': ['5G', '네트워크'],
    '에너지': ['신재생', '전기차'],
    '의료': ['디지털헬스', '바이오']
  };
  
  // 선택된 카테고리의 서브 카테고리 목록
  const subCategories = subCategoryMapping[categoryName] || [];
  
  // 해당 서브 카테고리에 속하는 트렌드 데이터만 필터링
  const filteredTrends = subCategoryTrends.filter(trend => 
    subCategories.includes(trend.keyword)
  );
  
  return Promise.resolve(filteredTrends);
}
