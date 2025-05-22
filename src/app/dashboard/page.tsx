import { cookies } from 'next/headers';
import { Suspense } from 'react';
import NewsPaperSkeleton from './skeletons/NewsPaperSkeleton';
import TrendSkeleton from './skeletons/TrendSkeleton';
import HighlightSkeleton from './skeletons/HighlightSkeleton';
import NewsPaperSectionServer from './components/NewsPaperSectionServer';
import TrendSectionServer from './components/TrendSectionServer';
import HighlightSectionServer from './components/HighlightSectionServer';
import SearchInput from './components/SearchInput';

type SearchParams = {
  search?: string;
};

export default async function Dashboard({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolvedParams = await searchParams;
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access_token')?.value;
  const search = resolvedParams?.search || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600 mt-2">최신 뉴스와 논문을 확인하고 트렌드를 분석하세요.</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <SearchInput />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<NewsPaperSkeleton />}>
            <NewsPaperSectionServer access_token={access_token} search={search} />
          </Suspense>
        </div>

        <div className="space-y-8">
          <Suspense fallback={<TrendSkeleton />}>
            <TrendSectionServer />
          </Suspense>

          <Suspense fallback={<HighlightSkeleton />}>
            <HighlightSectionServer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
