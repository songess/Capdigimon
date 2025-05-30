import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import NewsDetailSectionServer from './components/NewsDetailSectionServer';
import EntityCardSectionServer from './components/EntityCardSectionServer';
import RelatedItemsSectionServer from './components/RelatedItemsSectionServer';
import NewsDetailSkeleton from './skeletons/NewsDetailSkeleton';
import EntityCardSkeleton from './skeletons/EntityCardSkeleton';
import RelatedItemsSkeleton from './skeletons/RelatedItemsSkeleton';

interface Props {
  searchParams: Promise<{ id: string; type: string }>;
}

export default async function NewsDetail({ searchParams }: Props) {
  const params = await searchParams;
  const id = params.id;
  const type = params.type || 'news';

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">콘텐츠를 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-6">요청하신 콘텐츠가 존재하지 않거나 삭제되었습니다.</p>
          <Link href="/dashboard">
            <Button>대시보드로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          대시보드로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<NewsDetailSkeleton />}>
            <NewsDetailSectionServer id={id} type={type} />
          </Suspense>
        </div>

        <div className="space-y-6">
          <Suspense fallback={<EntityCardSkeleton />}>
            <EntityCardSectionServer id={id} type={type} />
          </Suspense>

          <Suspense fallback={<RelatedItemsSkeleton />}>
            <RelatedItemsSectionServer id={id} type={type} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
