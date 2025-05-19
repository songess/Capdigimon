import { TrendData } from '@/types/type';

// 서브 카테고리 트렌드 데이터
export const subCategoryTrends: TrendData[] = [
  // 컴퓨터 공학 서브 카테고리 트렌드
  { date: '2025-01', keyword: '컴퓨터 아키텍처', count: 120 },
  { date: '2025-01', keyword: '임베디드 시스템', count: 90 },
  { date: '2025-01', keyword: 'VLSI 설계', count: 70 },

  { date: '2025-02', keyword: '컴퓨터 아키텍처', count: 150 },
  { date: '2025-02', keyword: '임베디드 시스템', count: 110 },
  { date: '2025-02', keyword: 'VLSI 설계', count: 85 },

  { date: '2025-03', keyword: '컴퓨터 아키텍처', count: 200 },
  { date: '2025-03', keyword: '임베디드 시스템', count: 140 },
  { date: '2025-03', keyword: 'VLSI 설계', count: 100 },

  { date: '2025-04', keyword: '컴퓨터 아키텍처', count: 250 },
  { date: '2025-04', keyword: '임베디드 시스템', count: 180 },
  { date: '2025-04', keyword: 'VLSI 설계', count: 120 },

  // 전기/전자 공학 서브 카테고리 트렌드
  { date: '2025-01', keyword: '전력 시스템', count: 65 },
  { date: '2025-01', keyword: '전자공학', count: 80 },
  { date: '2025-01', keyword: '통신 시스템', count: 55 },

  { date: '2025-02', keyword: '전력 시스템', count: 75 },
  { date: '2025-02', keyword: '전자공학', count: 95 },
  { date: '2025-02', keyword: '통신 시스템', count: 60 },

  { date: '2025-03', keyword: '전력 시스템', count: 90 },
  { date: '2025-03', keyword: '전자공학', count: 115 },
  { date: '2025-03', keyword: '통신 시스템', count: 70 },

  { date: '2025-04', keyword: '전력 시스템', count: 110 },
  { date: '2025-04', keyword: '전자공학', count: 130 },
  { date: '2025-04', keyword: '통신 시스템', count: 85 },

  // IT 기업 서브 카테고리 트렌드
  { date: '2025-01', keyword: '퀄컴', count: 60 },
  { date: '2025-01', keyword: '미디어텍', count: 50 },
  { date: '2025-01', keyword: '애플', count: 45 },

  { date: '2025-02', keyword: '퀄컴', count: 70 },
  { date: '2025-02', keyword: '미디어텍', count: 65 },
  { date: '2025-02', keyword: '애플', count: 55 },

  { date: '2025-03', keyword: '퀄컴', count: 85 },
  { date: '2025-03', keyword: '미디어텍', count: 75 },
  { date: '2025-03', keyword: '애플', count: 65 },

  { date: '2025-04', keyword: '퀄컴', count: 100 },
  { date: '2025-04', keyword: '미디어텍', count: 90 },
  { date: '2025-04', keyword: '애플', count: 75 },
];

// 서브 카테고리 트렌드 데이터 가져오기
export function fetchSubCategoryTrends(): Promise<TrendData[]> {
  return Promise.resolve(subCategoryTrends);
}

// 특정 카테고리의 서브 카테고리 트렌드 데이터 가져오기
export function fetchSubCategoryTrendsByCategory(categoryName: string): Promise<TrendData[]> {
  // 카테고리별 서브 카테고리 매핑
  const subCategoryMapping: { [key: string]: string[] } = {
    COMPUTER_ENGINEERING: [
      '컴퓨터 아키텍처',
      '임베디드 시스템',
      'VLSI 설계',
      '운영체제',
      '컴퓨터 네트워크',
      '소프트웨어 공학',
      '인공지능/로보틱스',
      '데이터 사이언스',
      '정보보안',
    ],
    ELECTRICAL_ELECTRONIC_ENGINEERING: [
      '전력 시스템',
      '전자공학',
      '통신 시스템',
      '제어 시스템',
      '신호 처리',
      '마이크로일렉트로닉스/나노기술',
      '전자기학/마이크로파',
      '계측/센싱',
      '광학/포토닉스',
    ],
    IT_CATEGORY: ['퀄컴', '미디어텍', '애플', '샤오미', '비보', 'OPPO', '화웨이', '스냅드래곤', '디멘시티', '키린'],
  };

  // 선택된 카테고리의 서브 카테고리 목록
  const subCategories = subCategoryMapping[categoryName] || [];

  // 해당 서브 카테고리에 속하는 트렌드 데이터만 필터링
  const filteredTrends = subCategoryTrends.filter((trend) => subCategories.includes(trend.keyword));

  return Promise.resolve(filteredTrends);
}
